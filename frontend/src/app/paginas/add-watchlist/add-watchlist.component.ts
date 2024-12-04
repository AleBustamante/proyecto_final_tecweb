import { Component } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-add-watchlist',
  standalone: true,
  imports: [],
  templateUrl: './add-watchlist.component.html',
  styleUrl: './add-watchlist.component.scss'
})
export class AddWatchlistComponent {
  //userId: number = 0; // Se ingresará manualmente
  //movieId: number = 0; // Se ingresará manualmente
  //watched: boolean = false; // Estado inicial

  constructor(private peliculasService: PeliculasService) {}
  

  agregarAWachlist(event: Event,userId: number, movieId: number, watched: string) {
    console.log('Formulario enviado');
    event.preventDefault();
    if (!userId || !movieId) {
      console.error('El ID del usuario y el ID de la película son obligatorios.');
      return;
    }
    const watchedBoolean: boolean = watched === 'true';  // Convertimos el string 'true'/'false' a booleano
    this.peliculasService.agregarPeliculaAWachlist(userId, movieId, watchedBoolean).subscribe(
      (response) => {
        console.log('Película agregada a la lista de seguimiento:', response);
        alert('Película agregada con éxito.');
        this.limpiarFormulario();
      },
      (error) => {
        console.error('Error al agregar a la lista de seguimiento:', error);
        alert('Ocurrió un error al agregar la película.');
      }
    );
  }

  limpiarFormulario() {
    // this.userId = 0;
    // this.movieId = 0;
    // this.watched = false;
  }
}
