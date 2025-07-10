import axios from "axios";

export type Movie = {
  Title: string;
  Year: string;
  Runtime: string;
  Poster?: string;
};

export const fetchMovies = async (): Promise<Movie[]> => {
  const res = await axios.get<Movie[]>(
    "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies"
  );
  return res.data;
};
