import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Search } from './Search';

const mockPolicies = [
  { slug: 'policy-1', title: 'Política 1', category: { slug: 'cat1' } },
  { slug: 'policy-2', title: 'Política 2', category: { slug: 'cat2' } },
];

vi.mock('@/hooks/usePolicies', () => ({
  usePolicies: vi.fn(({ search }) => ({
    data: search ? { policies: mockPolicies } : { policies: [] },
  })),
}));

const pushMock = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe('Search component', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('Renderiza o input de busca', () => {
    render(<Search />);
    expect(
      screen.getByPlaceholderText(/buscar pelo tema/i),
    ).toBeInTheDocument();
  });
});
