import { useContext } from 'react';

import { FavoriteContext } from '@/context/FavoriteContext';

export function useFavorites() {
  const { favorites, setFavorites } = useContext(FavoriteContext);

  return { favorites, setFavorites };
}
