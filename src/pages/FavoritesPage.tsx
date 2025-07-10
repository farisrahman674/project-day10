import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorite";
import type { Movie } from "../api/movieApi";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const favs = getFavorites();
    setFavorites(favs);
  }, []);

  if (favorites.length === 0) {
    return <p className="p-4">Kamu belum punya favorite film.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      {favorites.map((movie) => (
        <div
          key={movie.Title}
          className="flex gap-4 items-start border rounded-lg p-4 dark:bg-gray-800"
        >
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-24 h-auto rounded"
          />
          <div>
            <h3 className="text-lg font-bold">{movie.Title}</h3>
            <p className="text-sm text-muted-foreground">
              {movie.Year} • {movie.Runtime}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
