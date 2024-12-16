import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

const API_URL = "https://tecweb-project.duckdns.org";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuthenticated = signal(false);
  currentUser = signal<LoginResponse["user"] | null>(null);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      this.isAuthenticated.set(true);
      this.currentUser.set(user);
    }
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/register`, user);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/login`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          this.isAuthenticated.set(true);
          this.currentUser.set(response.user);
        }),
      );
  }

  addToWatchlist(
    userId: number,
    movieId: number,
    watched: boolean,
  ): Observable<any> {
    return this.http.post(`${API_URL}/watchlist`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      params: {
        user_id: userId.toString(),
        movie_id: movieId.toString(),
        watched: watched.toString(),
      },
    });
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    console.log("Closing session");
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  updateUser(userId: number, updateData: Partial<User>): Observable<any> {
    return this.http.patch(`${API_URL}/user/${userId}`, updateData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
}
