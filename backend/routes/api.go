package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Response es la estructura que devolveremos como JSON
type Response struct {
	Message string `json:"message"`
}

func main() {
	// Creamos un router de Gin
	router := gin.Default()

	// Ruta GET /hola
	router.GET("/hola", func(c *gin.Context) {
		response := Response{
			Message: "¡Hola desde el servidor Go con Gin!",
		}

		c.JSON(http.StatusOK, response)
	})
	router.POST("/insert", func(c *gin.Context) {
		response := Response{
			Message: "This is a confirmation message",
		}

		c.JSON(http.StatusOK, response)
	})

	router.Run(":8080")
}
