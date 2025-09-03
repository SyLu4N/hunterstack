'use client';

import { ReactNode } from 'react';

import { FavoriteProvider } from '@/context/FavoriteContext';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteProvider>
        {children}
        <Toaster richColors />
        <ReactQueryDevtools />
      </FavoriteProvider>
    </QueryClientProvider>
  );
}
