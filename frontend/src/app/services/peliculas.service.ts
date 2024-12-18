import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//import { HttpParams } from '@angular/common/http';
//import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: "root",
})
export class PeliculasService {
  //private apiUrl = 'http://localhost:8080';
  private apiUrl = "https://tecweb-project.duckdns.org";

  constructor(private http: HttpClient) {}

  obtenerPeliculaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`);
    /*return this.http.get(`${this.apiUrl}/search?q=/${id}`);*/
  }
  buscarPeliculasPorTitulo(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${title}`);
  }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }
  addToWatchlist(
    userId: number,
    movieId: number,
    watched: boolean = false,
  ): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(
      `${this.apiUrl}/watchlist?user_id=${userId}&movie_id=${movieId}&watched=${watched}`,
      {},
      { headers },
    );
  }

  getWatchlist(userId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/watchlist?user_id=${userId}`, {
      headers,
    });
  }

  actualizarWatched(
    userId: number,
    movieId: number,
    watched: boolean,
  ): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(
      `${this.apiUrl}/watchlist?user_id=${userId}&movie_id=${movieId}&watched=${watched}`,
      null,
      { headers },
    );
  }

  deleteElementWatchList(userId: number, movieId: number) {
    const headers = this.getHeaders();
    return this.http.delete(
      `${this.apiUrl}/watchlist?user_id=${userId}&movie_id=${movieId}`,
      { headers },
    );
  }
}
