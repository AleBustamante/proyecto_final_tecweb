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
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
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

  getWatchlist(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/watchlist?user_id=${userId}`, { headers });
    //return this.http.get(
      //`${this.apiUrl}/watchlist?user_id=${userId}`,
      //{headers}
    //);
  }
  actualizarWatched(movieId: number, watched: boolean): Observable<any> {
    const headers = this.getHeaders();
    const body = { watched };
    return this.http.patch<any>(`${this.apiUrl}/watchlist/${movieId}`, body, { headers });
  }
  
}
