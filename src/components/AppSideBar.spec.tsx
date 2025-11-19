import { ReactNode } from 'react';

import { useCategories } from '@/hooks/useCategories';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { AppSidebar } from './AppSideBar';
import { SidebarProvider } from './ui/sidebar';

vi.mock('@/hooks/useCategories');

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({ favorites: [] }),
}));

vi.mock('./UserNav', () => ({
  UserNav: () => <div aria-label="user-nav-mock" />,
}));

export function renderWithSidebar(ui: ReactNode) {
  return render(<SidebarProvider>{ui}</SidebarProvider>);
}

describe('AppSidebar', () => {
  const fakeCategories = [
    { slug: 'cat1', name: 'Categoria 1' },
    {
      slug: 'cat2',
      name: 'Uma categoria muito longa que precisa de abreviação',
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Mostra skeletons enquanto está carregando', () => {
    (useCategories as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: true,
    });

    renderWithSidebar(<AppSidebar />);

    expect(screen.getAllByLabelText(/carregando/i)).toHaveLength(12);
  });

  // ---

  it('Renderiza categorias corretamente', async () => {
    (useCategories as any).mockReturnValue({
      data: { categories: fakeCategories, totalCount: 2 },
      isLoading: false,
      isFetching: false,
    });

    renderWithSidebar(<AppSidebar />);

    expect(await screen.findByText('Categoria 1')).toBeInTheDocument();

    const abbr = await screen.findByTitle(fakeCategories[1].name);
    expect(abbr).toBeInTheDocument();
    expect(abbr.textContent?.length).toBeLessThanOrEqual(33);
    expect(abbr.textContent).toContain('...');
  });

  // ---

  it('Mostra "Ver mais..." quando há mais categorias', async () => {
    (useCategories as any).mockReturnValue({
      data: { categories: fakeCategories, totalCount: 15 },
      isLoading: false,
      isFetching: false,
    });

    renderWithSidebar(<AppSidebar />);

    const moreButton = await screen.findByText('Ver mais...');
    expect(moreButton).toBeInTheDocument();
  });

  // ---

  it('Salva categorias no localStorage após clicar em "Ver mais"', async () => {
    (useCategories as any).mockReturnValue({
      data: { categories: fakeCategories, totalCount: 13 },
      isLoading: false,
      isFetching: false,
    });

    renderWithSidebar(<AppSidebar />);

    await userEvent.click(screen.getByText(/ver mais/i));

    await waitFor(() => {
      const stored = localStorage.getItem('categories');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.data[0].slug).toBe('cat1');
    });
  });

  // ---

  it('Carrega categorias do localStorage se não expirou', async () => {
    const payload = {
      data: fakeCategories,
      expire: Date.now() + 1000 * 60 * 5,
    };

    localStorage.setItem('categories', JSON.stringify(payload));

    (useCategories as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
    });

    renderWithSidebar(<AppSidebar />);

    expect(await screen.findByText('Categoria 1')).toBeInTheDocument();

    const text = fakeCategories[1].name.slice(0, 30) + '...';
    expect(await screen.findByText(text)).toBeInTheDocument();
  });
});
