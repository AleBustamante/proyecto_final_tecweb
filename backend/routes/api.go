package api

import (
	"database/sql"
	"net/http"
	"strconv"

	db "github.com/AleBustamante/proyecto_final_tecweb/tree/main/backend/db"
	m "github.com/AleBustamante/proyecto_final_tecweb/tree/main/backend/models"
	"github.com/gin-gonic/gin"
)

func ExposeAPI() {
	router := gin.Default()

	router.GET("/movie/:id", func(c *gin.Context) {
		id := c.Param("id")
		movie, err := db.FindMovieById(id)
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
			return
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, movie)
	})

	router.GET("/search", func(c *gin.Context) {
		title := c.Query("q")
		genre := c.Query("genre")

		if title == "" && genre == "" {
			c.JSON(400, gin.H{"error": "At least one parameter ('q' or 'genre') is needed"})
			return
		}

		movies, err := db.FindByTitleOrGenre(title, genre)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, movies)
	})

	router.POST("/register", func(c *gin.Context) {
		var user m.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := db.InsertNewUser(user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		})
	})

	router.POST("/watchlist", func(c *gin.Context) {
		userID, _ := strconv.Atoi(c.Query("user_id"))
		movieID, _ := strconv.Atoi(c.Query("movie_id"))
		watched, _ := strconv.ParseBool(c.Query("watched"))

		err := db.AddToWatchlist(userID, movieID, watched)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Watchlist updated successfully"})
	})

	router.PATCH("/watchlist", func(c *gin.Context) {
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
		err = db.UpdateWatchedStatus(userID, movieID, watched)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Watched status updated successfully"})
	})
	router.DELETE("/watchlist", func(c *gin.Context) {
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
		err = db.RemoveFromWatchlist(userID, movieID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Movie removed from watchlist"})
	})

	router.Run(":8080")
}
