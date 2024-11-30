package models

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

type MovieJSON struct {
	ID     int      `json:"id"`
	Title  string   `json:"title"`
	Genres []string `json:"genres"`
	ImdbID string   `json:"imdb_id"`
	TmdbID string   `json:"tmdb_id"`
}

type User struct {
	ID       int
	Username string
	Email    string
	Password string
}

type UserJSON struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
