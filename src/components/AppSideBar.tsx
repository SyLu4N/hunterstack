'use client';

import { Fragment, useEffect, useState } from 'react';

import { Category } from '@/@types/Category';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { useCategories } from '@/hooks/useCategories';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';

import { NavLink } from './NavLink';
import { Skeleton } from './ui/skeleton';

const EXPIRATION_TIME_CATEGORIES = 1000 * 60 * 60;

export function AppSidebar() {
  const { favorites } = useFavorites();

  const fakeCategories = new Array(12).fill('-');

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useCategories(page);

  const [categories, setCategories] = useState<Category[]>(
    data?.categories || [],
  );

  useEffect(() => {
    const stored = localStorage.getItem('categories');

    if (stored) {
      const parsed = JSON.parse(stored);

      if (parsed.expire > Date.now()) {
        if (parsed.data.length > (data?.categories?.length || 0)) {
          setCategories(parsed.data);
        }
      } else {
        localStorage.removeItem('categories');
      }
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const payload = {
        data: categories,
        expire: Date.now() + EXPIRATION_TIME_CATEGORIES,
      };

      localStorage.setItem('categories', JSON.stringify(payload));
    }
  }, [categories]);

  useEffect(() => {
    if (data?.categories) {
      setCategories((prev) => {
        const newCategories = data.categories.filter(
          (cat) => !prev.some((prevCat) => prevCat.slug === cat.slug),
        );

        return [...prev, ...newCategories];
      });
    }
  }, [data]);

  return (
    <Sidebar className="border-background-400">
      <SidebarHeader className="bg-background-700 flex items-center">
        <Link href="/">
          <img
            src="https://www.hunterstack.io/hubfs/Logo-white.png"
            className="w-full max-w-48 pb-1"
            alt="Logotipo da empresa HunterStack"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-background-700">
        <SidebarGroup>
          <SidebarGroupLabel>Categorias</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="mx-2">
              <nav className="text-letter-300">
                {isLoading || isFetching ? (
                  <div className="flex flex-col gap-1">
                    {fakeCategories.map((_, index) => (
                      <Skeleton
                        className="h-4 w-40 bg-background-400"
                        key={index}
                      />
                    ))}
                  </div>
                ) : (
                  <Fragment>
                    <ul>
                      {categories?.map((category) => (
                        <NavLink
                          key={category.slug}
                          href={`/${category.slug}`}
                          text={category.name}
                        />
                      ))}
                    </ul>

                    {(data?.totalCount || 0) > categories.length && (
                      <span
                        onClick={() => setPage((prev) => prev + 1)}
                        className="text-primary-500 cursor-pointer inline-block mt-2 hover:text-primary-300 transition-all"
                      >
                        {isLoading || isFetching
                          ? 'Carregando...'
                          : 'Ver mais...'}
                      </span>
                    )}
                  </Fragment>
                )}
              </nav>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {favorites.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Favoritos</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="mx-2">
                <nav className="text-letter-300">
                  <Fragment>
                    <ul>
                      {favorites?.map((policy) => (
                        <NavLink
                          key={policy.slug}
                          href={`/${policy.category.slug}/${policy.slug}`}
                          text={policy.title}
                        />
                      ))}
                    </ul>
                  </Fragment>
                </nav>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
