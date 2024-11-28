package db

import (
	"database/sql"
	"fmt"

	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

// Response es la estructura que devolveremos como JSON
type Response struct {
	Message string `json:"message"`
}

type Movie struct {
	ID     int
	Title  string
	Genres string
	ImdbID string
	TmdbID string
}

func ConnectToDb() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db_name := os.Getenv("TURSO_DB_NAME")
	db_token := os.Getenv("TURSO_AUTH_TOKEN")
	url := "libsql://" + db_name + ".turso.io?authToken=" + db_token

	db, err := sql.Open("libsql", url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to open db %s: %s", url, err)
		os.Exit(1)
	}
	QueryMovies(db)
	defer db.Close()
}

func QueryMovies(db *sql.DB) {
	rows, err := db.Query("SELECT * FROM movie LIMIT 3;")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v", err)
		os.Exit(1)
	}
	defer rows.Close()

	var movies []Movie

	for rows.Next() {
		var movie Movie

		if err := rows.Scan(&movie.ID, &movie.Title, &movie.Genres, &movie.ImdbID, &movie.TmdbID); err != nil {
			fmt.Println("Error scanning row:", err)
			return
		}

		movies = append(movies, movie)
		fmt.Println(movie.ID, movie.Title)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during rows iteration:", err)
	}
}
