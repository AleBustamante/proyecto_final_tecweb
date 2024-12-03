import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'http://localhost:8080'; // Cambia esto según la URL de tu backend
  
  constructor(private http: HttpClient) { }

  /*obtenerPeliculas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }*/
  obtenerPeliculaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`);
    /*return this.http.get(`${this.apiUrl}/search?q=/${id}`);*/
  }
  buscarPeliculasPorTitulo(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${title}`);
  }

  /*buscarPeliculas(title: string, genre: string): Observable<any> {
    let url = `${this.apiUrl}/search?`;
    if (title) {
      url += `q=${title}`;
    }
    if (genre) {
      url += (title ? `&` : '') + `genre=${genre}`;
    }
    return this.http.get(url);
  }*/
  /*buscar por titulo */
  /*
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Eliminar una película por ID
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Agregar una nueva película
  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);
  }

  // Actualizar una película existente
  updateMovie(id: number, movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, movie);
  }*/
}
