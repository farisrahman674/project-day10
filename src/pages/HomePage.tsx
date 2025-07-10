// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import type { Movie } from "../api/movieApi";
import { fetchMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.Title} movie={movie} />
      ))}
    </div>
  );
}
