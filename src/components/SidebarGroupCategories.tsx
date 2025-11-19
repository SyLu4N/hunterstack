'use client';

import { Fragment, useEffect, useState } from 'react';
import { TbCategory2 } from 'react-icons/tb';

import { Category } from '@/@types/Category';
import { useCategories } from '@/hooks/useCategories';
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

export function SidebarGroupCategories() {
  const fakeCategories = new Array(12).fill('-');

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useCategories(page);

  const [categories, setCategories] = useState<Category[]>(
    data?.categories || [],
  );

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
    <AnimatePresence>
      <SidebarGroup>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <SidebarGroupLabel className="gap-1">
            <TbCategory2 /> Categorias
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
                    {categories?.map((category) => (
                      <motion.span key={category.slug} variants={ITEM_VARIANTS}>
                        <NavLink
                          href={`/${category.slug}`}
                          text={category.name}
                        />
                      </motion.span>
                    ))}

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
              </motion.ul>
            </nav>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </AnimatePresence>
  );
}
