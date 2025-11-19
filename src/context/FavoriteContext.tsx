'use client';

import {
  createContext,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FavoriteData as FavoriteDataStorage } from '@/@types/FavoriteData';
import { useAuth } from '@/hooks/useAuth';
import { fetchFavorites, updateFavorites } from '@/localStorage/favorites';
import { api } from '@/services/api';

interface favoritesProvider {
  children: ReactNode;
}

type FavoriteData = {
  favorites: FavoriteDataStorage[];
  setFavorites: (policies: FavoriteDataStorage[]) => void;
  totalCount: RefObject<number>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

type FavoritesFetchData = {
  favorites: FavoriteDataStorage[];
  totalCount: number;
};

const PAGE_SIZE = 12;

export const FavoriteContext = createContext({} as FavoriteData);

export function FavoriteProvider({ children }: favoritesProvider) {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState<FavoriteDataStorage[]>([]);
  const [page, setPage] = useState(1);

  const totalCount = useRef(favorites.length || 0);

  async function getFavoritesUser() {
    const { data } = await api.get<FavoritesFetchData>(`/favorites`);

    const favoritesUser = data.favorites;
    totalCount.current = data.totalCount;

    const mergedFavorites = [
      ...favoritesUser,

      ...favorites.filter(
        (local) =>
          !favoritesUser.some(
            (userFav) => userFav.policy.slug === local.policy.slug,
          ),
      ),
    ];

    const favoritesOnlyLocal = favorites.filter(
      (local) =>
        !favoritesUser.some(
          (userFav) => userFav.policy.slug === local.policy.slug,
        ),
    );

    setFavorites(mergedFavorites);

    await Promise.all(
      favoritesOnlyLocal.map((favorite) =>
        api.post<FavoriteDataStorage>(
          `/favorites`,
          {
            policyId: favorite.policy.id,
          },
          { silent: true },
        ),
      ),
    );
  }

  useEffect(() => {
    const favoritesStorage = fetchFavorites();

    if (favoritesStorage.length) {
      const start = (page - 1) * PAGE_SIZE;
      const end = page * PAGE_SIZE;

      const newFavorites = favoritesStorage.slice(start, end);
      setFavorites(newFavorites);

      totalCount.current = favoritesStorage.length;
    }
  }, []);

  useEffect(() => {
    if (user) getFavoritesUser();
  }, [user]);

  useEffect(() => {
    updateFavorites(favorites);
  }, [favorites]);

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        setFavorites,
        totalCount,
        page,
        setPage,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
