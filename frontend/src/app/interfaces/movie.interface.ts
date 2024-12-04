export interface Movie {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
}

export interface Genre {
  name: string;
}
