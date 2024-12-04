import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { HttpParams } from '@angular/common/http';
//import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  //private apiUrl = 'http://localhost:8080'; // Cambia esto según la URL de tu backend
  private apiUrl = 'https://tecweb-project.duckdns.org';

  constructor(private http: HttpClient) { }

  obtenerPeliculaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`);
    /*return this.http.get(`${this.apiUrl}/search?q=/${id}`);*/
  }
  buscarPeliculasPorTitulo(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${title}`);
  }
  //agregarPeliculaAWachlist(userId: number, movieId: number, watched: boolean): Observable<any>
  //agregarPeliculaAWachlist(userId: number, movieId: number, watched: boolean){
    //const params = new HttpParams()
      //.set('user_id', userId.toString())
      //.set('movie_id', movieId.toString())
      //.set('watched', watched.toString());

    //return this.http.post(`${this.apiUrl}/watchlist`, {}, { params });
  //}
  addToWatchlist(userId: number, movieId: number, watched: boolean = false): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(
      `${this.apiUrl}/watchlist?user_id=${userId}&movie_id=${movieId}&watched=${watched}`,
      {},
      { headers }
    );
  }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  // Eliminar una película por ID
  /*deleteMovie(id: number): Observable<void> {
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
