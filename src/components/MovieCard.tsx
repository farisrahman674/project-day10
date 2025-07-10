// src/components/MovieCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "../api/movieApi";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorite";
import { isLoggedIn } from "../utils/auth";

export default function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(movie.Title));
  }, []);

  const handleClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    toggleFavorite(movie);
    setFavorited((prev) => !prev);
  };

  const goToDetail = () => {
    navigate(`/movies/${encodeURIComponent(movie.Title)}`);
  };

  return (
    <Card className="relative cursor-pointer" onClick={goToDetail}>
      <CardContent className="p-3 flex flex-col items-center gap-2">
        {movie.Poster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="rounded w-full h-[300px] object-cover"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center">
            <p className="text-gray-600">No Image</p>
          </div>
        )}
        <div className="text-center">
          <h2 className="font-bold">{movie.Title}</h2>
          <p className="text-sm">
            {movie.Year} • {movie.Runtime}
          </p>
        </div>
      </CardContent>

      <button
        onClick={handleClickFavorite}
        className="absolute top-2 right-2"
        aria-label="Toggle Favorite"
      >
        {favorited ? (
          <Star className="w-5 h-5 text-yellow-400" />
        ) : (
          <Star className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
        )}
      </button>
    </Card>
  );
}
