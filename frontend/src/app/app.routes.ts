import { Routes } from '@angular/router';
import { MovieListComponent } from './paginas/movie-list/movie-list.component';
import { AddWatchlistComponent } from './paginas/add-watchlist/add-watchlist.component';
import { PeliculasComponent } from './paginas/peliculas/peliculas.component';

export const routes: Routes = [
    {
      path: 'buscar-peliculas',
      component: MovieListComponent
    },
    {
      path: 'agregar-peliculas',
      component: AddWatchlistComponent
    },
      {
    path: 'register',
    loadComponent: () => import('./paginas/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '*',
    redirectTo: 'login'
  },
  {
    path: 'watchList',
    component: PeliculasComponent
  }
];


