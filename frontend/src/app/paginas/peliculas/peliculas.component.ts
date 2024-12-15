import { Component, OnInit  } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { watchList } from '../../interfaces/watchList.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.scss'
})
export class PeliculasComponent implements OnInit {
  ngOnInit(): void {
      this.obtenerWatchList();
      console.log('xDDDD obtenidas:', this.watchList);
  }

constructor(private peliculasService: PeliculasService) {}
watchList: watchList[] = [];


  obtenerWatchList() {
    let user_localStorage = localStorage.getItem('user');
    if (user_localStorage != null) {
      const user = JSON.parse(user_localStorage);
      this.peliculasService.getWatchlist(user.id).subscribe(
        (data: watchList[]) => {
          this.watchList = data;
          console.log('Películas obtenidas:', data);
        },
        (error: any) => {
          console.error('Error al obtener películas:', error); // Manejar errores
        }
      );
    }   
  }

  eliminarElementoWatchlist(movieId: number){
    let user_localStorage = localStorage.getItem('user');
    if (user_localStorage != null) {
    const user = JSON.parse(user_localStorage);
    this.peliculasService.deleteElementWatchList(user.id, movieId).subscribe({
      next: (response) => {
        console.log('Elemento eliminado correctamente:', response);
        this.watchList = this.watchList.filter(movie => movie.movie_id !== movieId);
      },
      error: (err) => {
        console.error('Error al eliminar el elemento:', err);
      }
    });
  } 
  }

  // actualizarVisto(movieId: number, nuevoValor: boolean) {
  //   // Encuentra la película por su ID y actualiza su valor de 'watched'
  //   const pelicula = this.watchList.find(movie => movie.movie_id === movieId);
  //   if (pelicula) {
  //     pelicula.watched = nuevoValor;
  
  //     // Envía la actualización al servicio (puedes conectar con tu API aquí)
  //     this.peliculasService.actualizarWatched(movieId, nuevoValor).subscribe({
  //       next: () => console.log(`Actualizado visto para película ID: ${movieId}`),
  //       error: (error) => console.error('Error al actualizar "visto":', error),
  //     });
  //   }
  // }

}
