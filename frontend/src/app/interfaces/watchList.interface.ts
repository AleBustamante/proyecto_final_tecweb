export interface watchList {
    movie_id: number;
    title: string;
    release_date: string;
    overview: string;
    genres: Genre[];
    watched: boolean;
    /*"movie_id": 2,
        "title": "Ariel",
        "release_date": "1988-10-21",
        "genres": */
}

export interface Genre {
    id: Number;
    name: string;
  }