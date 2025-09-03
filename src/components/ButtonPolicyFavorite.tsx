'use client';

import { useEffect, useState } from 'react';

import { Policy } from '@/@types/Policy';
import { useFavorites } from '@/hooks/useFavorites';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';
import useSound from 'use-sound';

import { Button } from './ui/button';

import heart from '/public/lottie/heart.lottie';

interface Props {
  policy?: Policy | null;
}

export function ButtonPolicyFavorite({ policy }: Props) {
  const { favorites, setFavorites } = useFavorites();

  const [isFavorite, setIsFavorite] = useState(false);
  const [dotLottie, setDotLottie] = useState<null | DotLottie>(null);

  const [playOn] = useSound('/sounds/teste.wav');

  function handleFavoritePolicy() {
    if (!policy || !dotLottie) return;

    const newFavorites = [...favorites];

    if (dotLottie.isPlaying) dotLottie.stop();

    if (favorites.some((favorite) => favorite.slug === policy.slug)) {
      const updatedFavorites = newFavorites.filter(
        (favorite) => favorite.slug !== policy.slug,
      );

      dotLottie.setFrame(0);

      setFavorites(updatedFavorites);
    } else {
      newFavorites.push(policy);

      dotLottie.play();
      playOn();

      setFavorites(newFavorites);
    }
  }

  useEffect(() => {
    if (!policy || !dotLottie) return;

    const newFavorites = favorites;

    if (newFavorites.some((favorite) => favorite.slug === policy.slug)) {
      console.log(dotLottie.totalFrames);
      if (dotLottie.totalFrames) {
        dotLottie.setFrame(dotLottie.totalFrames - 1);
      }

      setIsFavorite(true);
    }
  }, [policy, dotLottie]);

  return (
    <Button
      type="button"
      className="flex items-center justify-center !w-8 !h-8 sm:!w-10 sm:!h-10 p-0 bg-white place-items-center rounded-md"
      onClick={handleFavoritePolicy}
      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <DotLottieReact
        src={heart}
        dotLottieRefCallback={(e) => setDotLottie(e)}
      />
    </Button>
  );
}
