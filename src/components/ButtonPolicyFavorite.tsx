import { useEffect, useRef, useState } from 'react';

import { Policy } from '@/@types/Policy';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { api } from '@/services/api';
import { LottieOptions, useLottie } from 'lottie-react';
import useSound from 'use-sound';

import { Button } from './ui/button';

import heart from '/public/lottie/heart.json';

interface Props {
  policy?: Policy | null;
}

export function ButtonPolicyFavorite({ policy }: Props) {
  const { user } = useAuth();
  const { favorites, setFavorites, totalCount } = useFavorites();

  const [isFavorite, setIsFavirote] = useState(false);

  const [playOn] = useSound('/sounds/teste.wav');

  const options: LottieOptions<'svg'> = {
    animationData: heart,
    loop: false,
    autoplay: false,
  };

  const { View, play, goToAndStop, animationItem } = useLottie(options);

  const initialRef = useRef(false);

  async function handleFavorite() {
    if (!policy) return;

    if (isFavorite) {
      goToAndStop(0, true);

      const newFavorites = favorites.filter(
        (favorite) => favorite.policy.slug !== policy?.slug,
      );

      setFavorites(newFavorites);
      setIsFavirote(false);
      totalCount.current -= 1;

      if (user) await api.delete(`/favorites/${policy?.id}`);
    } else {
      play();
      playOn();

      const newFavorite = {
        policy: {
          id: policy.id,
          slug: policy.slug,
          title: policy.title,

          category: {
            name: policy.category.name,
            slug: policy.category.slug,
          },
        },

        createdAt: new Date(),
      };

      setFavorites([...favorites, newFavorite!]);
      setIsFavirote(true);

      if (user) await api.post(`/favorites`, { policyId: policy?.id });
    }
  }

  useEffect(() => {
    if (!policy || !animationItem || !favorites.length) return;

    const initial = initialRef.current;
    const alreadyFavorite = favorites.some(
      (favorite) => favorite.policy.slug === policy.slug,
    );

    if (alreadyFavorite && !initial) {
      goToAndStop(animationItem.totalFrames - 1, true);
      setIsFavirote(true);
    }

    initialRef.current = true;
  }, [policy, favorites, animationItem]);

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
