import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor],
  template: `
    <div>
      <label for="title">Buscar por título:</label>
      <input
        type="text"
        id="title"
        #titleInput
        placeholder="Escribe el título de la película"
      >
    </div>
    <button (click)="buscarPeliculasPorTitulo(titleInput.value)">Buscar</button>

    @if(movies && movies.length > 0){
      <h2>Resultados de la búsqueda:</h2>
      @for(movie of movies; track movie.id){
        <div class="movie-card">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.overview }}</p>
          @if(movie.genres && movie.genres.length > 0){
            <div class="genres">
              <strong>Géneros:</strong>
              @for(genero of movie.genres; track genero.name){
                <span class="genre-tag">{{genero.name}}</span>
              }
            </div>
          }
          <button
            (click)="addToWatchlist(movie.id)"
            [disabled]="isAddingToWatchlist"
            class="watchlist-button"
          >
            Agregar a Watchlist
          </button>
          @if(additionSuccess[movie.id]){
            <span class="success-message">¡Agregado a la watchlist!</span>
          }
        </div>
      }
    } @else {
      <p>No se encontraron películas</p>
    }
  `,
  styles: [`
    .movie-card {
      border: 1px solid #ddd;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
    }
    .genre-tag {
      background: #e0e0e0;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      margin-right: 0.5rem;
    }
    .watchlist-button {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
    .watchlist-button:disabled {
      background: #ccc;
    }
    .success-message {
      color: green;
      margin-left: 1rem;
    }
  `]
})
export class MovieListComponent {
  movies: Movie[] = [];
  isAddingToWatchlist = false;
  additionSuccess: { [key: number]: boolean } = {};

  constructor(private peliculasService: PeliculasService) {}

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
        console.error('Error adding to watchlist:', error);
        // Handle error (show error message to user)
      },
      complete: () => {
        this.isAddingToWatchlist = false;
      }
    });
  }

  private getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id;
  }

  obtenerPeliculas() {
    const movieId = 2;
    this.peliculasService.obtenerPeliculaPorId(movieId).subscribe(
      (data: any) => {
        this.movies = data;
        console.log('Películas obtenidas:', this.movies);
      },
      (error: any) => {
        console.error('Error al obtener películas:', error); // Manejar errores
      }
    );
  }

  buscarPeliculasPorTitulo(title: string) {
    if (!title) {
      console.error('El título de la película no puede estar vacío');
      return;
    }

    this.peliculasService.buscarPeliculasPorTitulo(title).subscribe(
      (data: any) => {
        this.movies = data;
        console.log('Películas encontradas:', this.movies);
      },
      (error: any) => {
        console.error('Error al buscar películas:', error); // Manejar errores
      }
  );
  }
  // Se ejecuta al inicializar el componente
  /*ngOnInit(): void {
    this.obtenerPeliculas();
  }*/
}
