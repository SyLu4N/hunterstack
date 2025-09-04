import '@/styles/globals.css';
import { AppSidebar } from '@/components/AppSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { STALE_TIME_24HRS_QUERY } from '@/constants/revalidateTimeReactQuery';
import { getCategories } from '@/hooks/useCategories';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import Provider from './_provider';

export const metadata: Metadata = {
  title: 'Hunterstack.io',
  description:
    'Descubra tudo sobre segurança da informação, privacidade e proteção de dados. Conteúdo atualizado e revisado pela Inteligência Artificial.',
  applicationName: 'hunterstack.io',
  keywords: [
    'segurança da informação',
    'privacidade de dados',
    'proteção de dados',
    'termos de uso',
    'políticas de privacidade',
    'LGPD',
    'sigilo',
    'consentimento',
    'redes sociais seguras',
    'segurança digital',
    'comunicação segura',
  ],

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Hunterstack.io | Segurança da informação a um clique de distância.',
    description:
      'Saiba tudo sobre a segurança da informação, tópicos atualizados e revisados pela Inteligencia Artificial.',
    siteName: 'Hunterstack.io',

    images: [
      {
        url: 'https://www.hunterstack.io/hubfs/Logo-white.png',
        alt: 'Hunterstack.io Logotipo',
      },
    ],
  },

  creator: 'Luan Simões',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories', '1'],
    queryFn: async () => getCategories(),
    staleTime: STALE_TIME_24HRS_QUERY,
  });

  return (
    <html lang="pt-br">
      <body>
        <Provider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <SidebarProvider>
              <AppSidebar />

              <main className="w-full">
                <SidebarTrigger className="text-white ml-2 sticky top-4 hover:bg-background-400 p-2 my-4" />
                <div className="mx-6 md:mx-24 mb-4">{children}</div>
              </main>
            </SidebarProvider>
          </HydrationBoundary>
        </Provider>
      </body>
    </html>
  );
}
