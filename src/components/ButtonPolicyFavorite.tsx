import { useEffect, useState } from 'react';

import { Policy } from '@/@types/Policy';
import { useFavorites } from '@/hooks/useFavorites';
import { useLottie } from 'lottie-react';
import useSound from 'use-sound';

import { Button } from './ui/button';

import heart from '/public/lottie/heart.json';

interface Props {
  policy?: Policy | null;
}

export function ButtonPolicyFavorite({ policy }: Props) {
  const { favorites, setFavorites } = useFavorites();

  const [isFavorite, setIsFavirote] = useState(false);

  const [playOn] = useSound('/sounds/teste.wav');

  const options = {
    animationData: heart,
    loop: false,
    autoplay: false,
  };

  const { View, play, goToAndStop, playSegments } = useLottie(options);

  function handleFavorite() {
    if (isFavorite) {
      goToAndStop(0);

      const newFavorites = favorites.filter(
        (favorite) => favorite.slug !== policy?.slug,
      );

      setFavorites(newFavorites);
      setIsFavirote(false);
    } else {
      play();
      playOn();

      setFavorites([...favorites, policy!]);
      setIsFavirote(true);
    }
  }

  useEffect(() => {
    if (!policy) return;

    if (favorites.some((favorite) => favorite.slug === policy.slug)) {
      playSegments([59, 59]);
      setIsFavirote(true);
    }
  }, [policy, favorites]);

  return (
    <Button
      type="button"
      onClick={handleFavorite}
      className="flex items-center justify-center !w-8 !h-8 sm:!w-10 sm:!h-10 p-0 bg-white place-items-center rounded-md"
    >
      {View}
    </Button>
  );
}
