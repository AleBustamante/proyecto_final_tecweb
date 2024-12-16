import { Routes } from "@angular/router";
import { MovieListComponent } from "./paginas/movie-list/movie-list.component";
import { PeliculasComponent } from "./paginas/peliculas/peliculas.component";
import { ProfileComponent } from "./paginas/profile/profile.component";

export const routes: Routes = [
  {
    path: "buscar-peliculas",
    component: MovieListComponent,
  },
  {
    path: "register",
    loadComponent: () =>
      import("./paginas/register/register.component").then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./paginas/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "*",
    redirectTo: "login",
  },
  {
    path: "watchList",
    component: PeliculasComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
];
