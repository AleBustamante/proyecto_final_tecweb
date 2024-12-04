import { Routes } from '@angular/router';
import { MovieListComponent } from './paginas/movie-list/movie-list.component';
import { AddWatchlistComponent } from './paginas/add-watchlist/add-watchlist.component';

export const routes: Routes = [
    {path: 'buscar-peliculas', component: MovieListComponent},
    {path: 'agregar-peliculas', component: AddWatchlistComponent}
];
