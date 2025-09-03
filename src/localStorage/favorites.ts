import { Policy } from '@/@types/Policy';

import { FAVORITES_KEY } from './localStorageConfig';

export function fetchFavorites(): Policy[] {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  if (!favorites) return [];

  return JSON.parse(favorites);
}

export function getFavorite(slug: string): Policy | undefined {
  const response = localStorage.getItem(FAVORITES_KEY);
  const favorite: Policy[] = JSON.parse(response || '[]');

  return favorite.find((favorite) => favorite.slug === slug);
}

export function updateFavorites(favorites: Policy[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function removeFavorites(slug: string) {
  const favorites = fetchFavorites();

  const newFavorites = favorites.filter((favorite) => favorite.slug !== slug);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
}
