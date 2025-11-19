import { FavoriteData } from '@/@types/FavoriteData';

import { FAVORITES_KEY } from './localStorageConfig';

export function fetchFavorites(): FavoriteData[] {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  if (!favorites) return [];

  return JSON.parse(favorites);
}

export function getFavorite(slug: string): FavoriteData | undefined {
  const response = localStorage.getItem(FAVORITES_KEY);
  const favorite: FavoriteData[] = JSON.parse(response || '[]');

  return favorite.find((favorite) => favorite.policy.slug === slug);
}

export function updateFavorites(favorites: FavoriteData[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function removeFavorites(slug: string) {
  const favorites = fetchFavorites();

  const newFavorites = favorites.filter(
    (favorite) => favorite.policy.slug !== slug,
  );

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
}
