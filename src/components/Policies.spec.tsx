import { usePolicies } from '@/hooks/usePolicies';
import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';

import { Policies } from './Policies';

vi.mock('@/hooks/usePolicies');

describe('Policies', () => {
  const fakePolicies = [
    {
      slug: 'policy-1',
      title: 'Policy 1',
      summary: 'Resumo 1',
      source: 'Fonte 1',
      category: { slug: 'cat-1', name: 'Categoria 1' },
      createdAt: '2025-01-01',
    },
    {
      slug: 'policy-2',
      title: 'Policy 2',
      summary: 'Resumo 2',
      source: 'Fonte 2',
      category: { slug: 'cat-1', name: 'Categoria 1' },
      createdAt: '2025-01-02',
    },
  ];

  it('Renderiza skeletons enquanto está carregando', () => {
    (usePolicies as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      refetch: vi.fn(),
    });

    render(<Policies props={{ page: 1 }} />);

    expect(screen.getAllByLabelText(/carregando/i).length).toBeGreaterThan(1);
  });

  // ---

  it('renderiza políticas quando existem dados', () => {
    (usePolicies as Mock).mockReturnValue({
      data: { policies: fakePolicies, totalCount: 2 },
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<Policies props={{ page: 1 }} />);

    expect(screen.getByText('Policy 1')).toBeInTheDocument();
    expect(screen.getByText('Policy 2')).toBeInTheDocument();
  });

  // ---

  it('renderiza EmptyPolicy quando não há policies', () => {
    (usePolicies as Mock).mockReturnValue({
      data: { policies: [], totalCount: 0 },
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<Policies props={{ page: 1 }} />);

    expect(screen.getByText(/Não tem nada aqui!/i)).toBeInTheDocument();
  });

  // ---

  it('renderiza Breadcrumb quando category está definido', () => {
    (usePolicies as Mock).mockReturnValue({
      data: { policies: fakePolicies, totalCount: 2 },
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<Policies props={{ page: 1, category: 'cat-1' }} />);

    expect(screen.getByText('Categoria 1')).toBeInTheDocument();
  });

  // ---

  it('renderiza Pagination quando totalCount > 12', () => {
    (usePolicies as Mock).mockReturnValue({
      data: { policies: fakePolicies, totalCount: 20 },
      isLoading: false,
      refetch: vi.fn(),
    });

    render(<Policies props={{ page: 1 }} />);

    expect(screen.getByText('2')).toBeInTheDocument(); // Página 2
  });
});
