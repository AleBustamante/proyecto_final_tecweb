package api

import (
	"context"
	"database/sql"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	db "github.com/AleBustamante/proyecto_final_tecweb/tree/main/backend/db"
	m "github.com/AleBustamante/proyecto_final_tecweb/tree/main/backend/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/time/rate"
)

var limiter = rate.NewLimiter(5, 10)

func rateLimitMiddleware(c *gin.Context) {
	if !limiter.Allow() {
		c.JSON(http.StatusTooManyRequests, gin.H{"error": "Too many requests"})
		c.Abort()
		return
	}
	c.Next()
}

func loadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Printf("Error loading .env file: %v", err)
	}
}

func ExposeAPI() {
	loadEnv()
	gin.SetMode(gin.ReleaseMode)

	if gin.Mode() == gin.ReleaseMode {
		f, err := os.Create("gin.log")
		if err != nil {
			log.Fatal("Could not create  log file", err)
		}
		gin.DefaultWriter = io.MultiWriter(f, os.Stdout) //log to file and terminal
	}

	router := gin.Default()

	// Security headers middleware
	router.Use(func(c *gin.Context) {
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("X-XSS-Protection", "1; mode=block")
		c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		c.Next()
	})

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://localhost:4200",
		"http://localhost:8080",
	} // Agrega aquí tus dominios permitidos
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Content-Length",
		"Accept-Encoding",
		"X-CSRF-Token",
		"Authorization",
	}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour
	router.Use(cors.New(config))

	// Original routes with added error logging
	router.GET("/movie/:id", func(c *gin.Context) {
		id := c.Param("id")
		movie, err := db.FindMovieById(id)
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
			return
		}
		if err != nil {
			log.Printf("Error finding movie: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			return
		}
		c.JSON(http.StatusOK, movie)
	})

	router.GET("/search", func(c *gin.Context) {
		title := c.Query("q")
		genre := c.Query("genre")

		if title == "" && genre == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "At least one parameter ('q' or 'genre') is needed"})
			return
		}

		movies, err := db.FindByTitleOrGenre(title, genre)
		if err != nil {
			log.Printf("Error searching movies: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			return
		}
		c.JSON(http.StatusOK, movies)
	})

	// Protected routes group
	protected := router.Group("/")
	protected.Use(authMiddleware())
	{
		protected.POST("/register", func(c *gin.Context) {
			var user m.User
			if err := c.ShouldBindJSON(&user); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			user, err := db.InsertNewUser(user)
			if err != nil {
				log.Printf("Error registering user: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"id":       user.ID,
				"username": user.Username,
				"email":    user.Email,
			})
		})

		protected.POST("/watchlist", func(c *gin.Context) {
			userID, err := strconv.Atoi(c.Query("user_id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
				return
			}
			movieID, err := strconv.Atoi(c.Query("movie_id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie_id"})
				return
			}
			watched, err := strconv.ParseBool(c.Query("watched"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid watched value"})
				return
			}

			if err := db.AddToWatchlist(userID, movieID, watched); err != nil {
				log.Printf("Error adding to watchlist: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "Watchlist updated successfully"})
		})

		protected.PATCH("/watchlist", func(c *gin.Context) {
			userID, err := strconv.Atoi(c.Query("user_id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
				return
			}
			movieID, err := strconv.Atoi(c.Query("movie_id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie_id"})
				return
			}
			watched, err := strconv.ParseBool(c.Query("watched"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid watched value"})
				return
			}

			if err := db.UpdateWatchedStatus(userID, movieID, watched); err != nil {
				log.Printf("Error updating watched status: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "Watched status updated successfully"})
		})

		protected.DELETE("/watchlist", func(c *gin.Context) {
			userID, err := strconv.Atoi(c.Query("user_id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
				return
			}
			movieID, err := strconv.Atoi(c.Query("movie_id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie_id"})
				return
			}

			if err := db.RemoveFromWatchlist(userID, movieID); err != nil {
				log.Printf("Error removing from watchlist: %v", err)
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "Movie removed from watchlist"})
		})
	}

	srv := &http.Server{
		Addr:         ":8080",
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// Graceful shutdown
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to initialize server: %v\n", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// The context is used to inform the server it has 5 seconds to finish
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")

}

func generateToken(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("user_id", int(claims["user_id"].(float64)))
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
		}
	}
}
