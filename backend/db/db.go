package db

import (
	"database/sql"
	"fmt"

	"errors"
	"log"
	"os"

	m "github.com/AleBustamante/proyecto_final_tecweb/tree/main/backend/models"

	"github.com/joho/godotenv"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

func InsertNewUser(user m.User) (m.User, error) {
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
	defer db.Close()
	userWithId, err := queryInsertUser(db, user)

	return userWithId, nil
}

func FindMovieById(id string) (m.Movie, error) {
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
	defer db.Close()
	query := "SELECT * FROM movie WHERE movieId = ?;"

	movie, err := queryById(db, query, id)
	return movie, err
}

func FindByTitleOrGenre(title, genre string) ([]m.Movie, error) {
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
	defer db.Close()
	movies, err := queryByTitleOrGenre(db, title, genre)
	return movies, err
}

func queryInsertUser(db *sql.DB, user m.User) (m.User, error) {
	query := "INSERT INTO user (username, email, password) VALUES (?, ?, ?)"
	result, err := db.Exec(query, user.Username, user.Email, user.Password)

	if err != nil {
		log.Fatalf("Error when iserting the user: %v", err)
	}

	userId, err := result.LastInsertId()
	if err != nil {
		log.Fatalf("Error recovering the ID of the inserted user", err)
	}
	user.ID = int(userId)
	return user, err
}

func queryById(db *sql.DB, query, id string) (m.Movie, error) {
	rows, err := db.Query(query, id)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to execute query: %v", err)
		os.Exit(1)
	}
	defer rows.Close()

	var movie m.Movie

	for rows.Next() {

		if err := rows.Scan(&movie.ID, &movie.Title, &movie.Genres, &movie.ImdbID, &movie.TmdbID); err != nil {
			fmt.Println("Error scanning row:", err)
			return movie, errors.New("Error scanning row")
		}
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during rows iteration:", err)
	}
	return movie, nil
}

func queryByTitleOrGenre(db *sql.DB, title, genre string) ([]m.Movie, error) {
	query := "SELECT * FROM movie WHERE "
	if title != "" && genre != "" {
		query += "LOWER(title) LIKE LOWER(?) OR LOWER(genres) LIKE LOWER(?)"
		rows, err := db.Query(query, "%"+title+"%", "%"+genre+"%")
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to execute query: %v", err)
			os.Exit(1)
		}
		defer rows.Close()
		var movies []m.Movie

		for rows.Next() {
			var movie m.Movie
			if err := rows.Scan(&movie.ID, &movie.Title, &movie.Genres, &movie.ImdbID, &movie.TmdbID); err != nil {
				fmt.Println("Error scanning row:", err)
				movies = append(movies, movie)
				return movies, errors.New("Error scanning row")
			}
			movies = append(movies, movie)
		}
		if err := rows.Err(); err != nil {
			fmt.Println("Error during rows iteration:", err)
		}
		return movies, err

	} else if title != "" {
		query += "LOWER(title) LIKE LOWER(?)"
		rows, err := db.Query(query, "%"+title+"%")
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to execute query: %v", err)
			os.Exit(1)
		}
		defer rows.Close()
		var movies []m.Movie

		for rows.Next() {
			var movie m.Movie
			if err := rows.Scan(&movie.ID, &movie.Title, &movie.Genres, &movie.ImdbID, &movie.TmdbID); err != nil {
				fmt.Println("Error scanning row:", err)
				movies = append(movies, movie)
				return movies, errors.New("Error scanning row")
			}
			movies = append(movies, movie)
		}
		if err := rows.Err(); err != nil {
			fmt.Println("Error during rows iteration:", err)
		}
		return movies, err

	} else {
		query += "LOWER(genres) LIKE LOWER(?)"
		rows, err := db.Query(query, "%"+genre+"%")
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to execute query: %v", err)
			os.Exit(1)
		}
		defer rows.Close()
		var movies []m.Movie

		for rows.Next() {
			var movie m.Movie
			if err := rows.Scan(&movie.ID, &movie.Title, &movie.Genres, &movie.ImdbID, &movie.TmdbID); err != nil {
				fmt.Println("Error scanning row:", err)
				movies = append(movies, movie)
				return movies, errors.New("Error scanning row")
			}
			movies = append(movies, movie)
		}
		if err := rows.Err(); err != nil {
			fmt.Println("Error during rows iteration:", err)
		}
		return movies, err
	}
}
