'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { Policy } from '@/@types/Policy';
import { fetchFavorites, updateFavorites } from '@/localStorage/favorites';

interface favoritesProvider {
  children: ReactNode;
}

type FavoriteData = {
  favorites: Policy[];
  setFavorites: (policies: Policy[]) => void;
};

export const FavoriteContext = createContext({} as FavoriteData);

export function FavoriteProvider({ children }: favoritesProvider) {
  const [favorites, setFavorites] = useState<Policy[]>([]);

  useEffect(() => {
    const favorites = fetchFavorites();
    if (favorites.length) setFavorites(favorites);
  }, []);

  useEffect(() => {
    updateFavorites(favorites);
  }, [favorites]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
