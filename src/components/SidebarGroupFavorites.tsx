'use client';

import { Fragment, useState, useEffect } from 'react';
import { LuHeart } from 'react-icons/lu';

import { FavoriteData } from '@/@types/FavoriteData';
import { useFavorites } from '@/hooks/useFavorites';
import { api } from '@/services/api';
import { AnimatePresence, motion } from 'framer-motion';

import { ITEM_VARIANTS, LIST_VARIANTS } from './AppSideBar';
import { NavLink } from './NavLink';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from './ui/sidebar';
import { Skeleton } from './ui/skeleton';

type FavoritesFetchData = {
  favorites: FavoriteData[];
  totalCount: number;
};

export function SidebarGroupFavorites() {
  const fakeFavorites = new Array(12).fill('-');

  const { favorites, totalCount, setFavorites, page, setPage } = useFavorites();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page === 1) return;

    async function loadMore() {
      try {
        setIsLoading(true);

        const { data } = await api.get<FavoritesFetchData>(
          `/favorites?page=${page}`,
        );

        const merged = [
          ...favorites,
          ...data.favorites.filter(
            (f) => !favorites.some((x) => x.policy.slug === f.policy.slug),
          ),
        ];

        setFavorites(merged);
      } finally {
        setIsLoading(false);
      }
    }

    loadMore();
  }, [page]);

  return (
    <AnimatePresence>
      {favorites.length > 0 && (
        <SidebarGroup className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <SidebarGroupLabel className="gap-1 items-center">
              <LuHeart />
              Favoritos
            </SidebarGroupLabel>
          </motion.div>

          <SidebarGroupContent>
            <SidebarMenu className="mx-2">
              <nav className="text-letter-300">
                <motion.ul
                  variants={LIST_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {isLoading ? (
                    <div className="flex flex-col gap-1">
                      {fakeFavorites.map((_, index) => (
                        <Skeleton
                          className="h-4 w-40 bg-background-400"
                          key={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <Fragment>
                      {favorites.map((favorite) => (
                        <motion.span
                          key={favorite.policy.slug}
                          variants={ITEM_VARIANTS}
                        >
                          <NavLink
                            href={`/${favorite.policy.category.slug}/${favorite.policy.slug}`}
                            text={favorite.policy.title}
                          />
                        </motion.span>
                      ))}

                      {totalCount.current > favorites.length && (
                        <span
                          onClick={() => setPage((prev) => prev + 1)}
                          className="text-primary-500 cursor-pointer inline-block mt-2 hover:text-primary-300 transition-all"
                        >
                          Ver mais...
                        </span>
                      )}
                    </Fragment>
                  )}
                </motion.ul>
              </nav>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </AnimatePresence>
  );
}
