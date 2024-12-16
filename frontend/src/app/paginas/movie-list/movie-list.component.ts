import { Component } from "@angular/core";
import { PeliculasService } from "../../services/peliculas.service";
import { JsonPipe, NgFor, NgIf } from "@angular/common";
import { Movie } from "../../interfaces/movie.interface";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-movie-list",
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor],
  templateUrl: "./movie-list.component.html",
  styleUrl: "./movie-list.component.scss",
})
export class MovieListComponent {
  movies: Movie[] = [];
  isAddingToWatchlist = false;
  additionSuccess: { [key: number]: boolean } = {};
  isSearching = false;
  hasSearched = false;

  constructor(
    private peliculasService: PeliculasService,
    public authService: AuthService,
  ) {}

  addToWatchlist(movieId: number) {
    this.isAddingToWatchlist = true;
    const userId = this.getCurrentUserId(); // Implement this method to get the current user's ID

    this.peliculasService.addToWatchlist(userId, movieId).subscribe({
      next: () => {
        this.additionSuccess[movieId] = true;
        setTimeout(() => {
          this.additionSuccess[movieId] = false;
        }, 3000); // Hide success message after 3 seconds
      },
      error: (error) => {
        console.error("Error adding to watchlist:", error);
        // Handle error (show error message to user)
      },
      complete: () => {
        this.isAddingToWatchlist = false;
      },
    });
  }

  private getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.id;
  }

  obtenerPeliculas() {
    const movieId = 2;
    this.peliculasService.obtenerPeliculaPorId(movieId).subscribe(
      (data: any) => {
        this.movies = data;
        console.log("Películas obtenidas:", this.movies);
      },
      (error: any) => {
        console.error("Error al obtener películas:", error); // Manejar errores
      },
    );
  }

  buscarPeliculasPorTitulo(title: string) {
    if (!title) {
      console.error("El título de la película no puede estar vacío");
      return;
    }

    this.isSearching = true;
    this.hasSearched = true;

    this.peliculasService.buscarPeliculasPorTitulo(title).subscribe({
      next: (data: any) => {
        this.movies = data;
        console.log("Películas encontradas:", this.movies);
      },
      error: (error: any) => {
        console.error("Error al buscar películas:", error);
        this.movies = [];
      },
      complete: () => {
        this.isSearching = false;
      },
    });
  }
}
