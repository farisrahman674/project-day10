// src/utils/favorite.ts
import type { Movie } from "../api/movieApi";

const FAVORITES_KEY = "favorites";

export const getFavorites = (): Movie[] => {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const isFavorite = (title: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((movie) => movie.Title === title);
};

export const toggleFavorite = (movie: Movie) => {
  const favorites = getFavorites();
  const exists = favorites.find((m) => m.Title === movie.Title);

  let updated: Movie[];
  if (exists) {
    updated = favorites.filter((m) => m.Title !== movie.Title);
  } else {
    updated = [...favorites, movie];
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};
