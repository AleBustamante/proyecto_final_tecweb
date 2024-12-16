export interface Movie {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
  poster_path: string;
}

export interface Genre {
  name: string;
}
