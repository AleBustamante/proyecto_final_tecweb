export interface watchList {
  movie_id: number;
  title: string;
  release_date: string;
  genres: Genre[];
  watched: boolean;
  backdrop_path: string;
  poster_path: string;
  runtime: number;
  vote_average: number;
}

interface Genre {
  id: number;
  name: string;
}
