package api

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"

	"github.com/AleBustamante/proyecto_final_tecweb/tree/main/backend/db"
	m "github.com/AleBustamante/proyecto_final_tecweb/tree/main/backend/models"
	"github.com/gin-gonic/gin"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Response es la estructura que devolveremos como JSON
type Response struct {
	Message string `json:"message"`
}

func ToMovieJson(movie *m.Movie) m.MovieJSON {
	return m.MovieJSON{
		ID:     movie.ID,
		Title:  movie.Title,
		ImdbID: movie.ImdbID,
		TmdbID: movie.TmdbID,
		Genres: strings.Split(movie.Genres, "|"),
	}
}

func ToUserJson(user *m.User) m.UserJSON {
	return m.UserJSON{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Password: user.Password,
	}
}

func ExposeAPI() {
	router := gin.Default()

	// Find movies by ID
	router.GET("/movie/:id", func(c *gin.Context) {
		id := c.Param("id")
		var movie m.Movie
		movie, err := db.FindMovieById(id)

		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
			return
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, ToMovieJson(&movie))
	})

	//Find movies by title
	router.GET("/search", func(c *gin.Context) {
		title := c.Query("q")
		genre := c.Query("genre")
		fmt.Printf("title: %s", title)
		fmt.Printf("genre: %s", genre)

		if title == "" && genre == "" {
			c.JSON(400, gin.H{"error": "At least one parameter ('q' or 'genre') is needed"})
			return
		}
		movies, err := db.FindByTitleOrGenre(title, genre)

		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "No movie with the provided parameters was found"})
			return
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		var moviesJson []m.MovieJSON

		for _, m := range movies {
			moviesJson = append(moviesJson, ToMovieJson(&m))
		}
		c.JSON(http.StatusOK, moviesJson)
	})

	router.POST("/register-user", func(c *gin.Context) {
		var user m.User

		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		user, err := db.InsertNewUser(user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}

		c.JSON(http.StatusOK, gin.H{
			"message":  "User successfully registered",
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
		})
	})

	router.Run(":8080")
}
