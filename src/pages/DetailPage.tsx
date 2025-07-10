// src/pages/MovieDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../api/movieApi";
import { isLoggedIn } from "../utils/auth";
import { isFavorite, toggleFavorite } from "../utils/favorite";
import { Star } from "lucide-react";

export default function MovieDetailPage() {
  const { title } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies"
        );
        const allMovies: Movie[] = await res.json();
        const found = allMovies.find((m) => m.Title === title);
        setMovie(found || null);
        setFavorited(found ? isFavorite(found.Title) : false);
        setLoading(false);
      } catch (err) {
        console.error("Gagal fetch detail", err);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [title]);

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (!isLoggedIn()) return alert("Login dulu ya 😄");
    toggleFavorite(movie);
    setFavorited((prev) => !prev);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!movie) return <p className="p-4">Film tidak ditemukan.</p>;

  return (
    <div className="p-4 flex flex-col md:flex-row gap-6">
      {movie.Poster ? (
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-60 h-auto rounded"
        />
      ) : (
        <div className="w-60 h-80 bg-gray-300 flex items-center justify-center rounded">
          <p className="text-gray-600">No Image</p>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold">{movie.Title}</h2>
          <button onClick={handleToggleFavorite} className="mt-1">
            <Star
              className={`w-5 h-5 ${
                favorited ? "text-yellow-400" : "text-gray-400"
              }`}
            />
          </button>
        </div>
        <p className="text-muted-foreground text-sm">
          {movie.Year} • {movie.Runtime}
        </p>
      </div>
    </div>
  );
}
