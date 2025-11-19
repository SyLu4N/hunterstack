import { useContext } from 'react';

import { FavoriteContext } from '@/context/FavoriteContext';

export function useFavorites() {
  const { favorites, setFavorites, totalCount, page, setPage } =
    useContext(FavoriteContext);

  return { favorites, setFavorites, totalCount, page, setPage };
}
