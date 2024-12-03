import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: any;
  searchTitle: string = '';

  constructor(private peliculasService: PeliculasService) {}

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
