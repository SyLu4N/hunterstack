import { usePolicy } from '@/hooks/usePolicy';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Policy } from './Policy';

vi.mock('@/hooks/usePolicy');

describe('Policy component', () => {
  const fakePolicy = {
    title: 'Política de Privacidade',
    category: { slug: 'privacidade', name: 'Privacidade' },
    createdAt: new Date('2025-09-01T12:00:00Z'),
    source: 'Sistema',
    description: 'Primeiro parágrafo.\n\nSegundo parágrafo.',
  };

  beforeAll(() => {
    // Mock global do IntersectionObserver
    class IntersectionObserverMock {
      observe() {
        /*  */
      }
      unobserve() {
        /*  */
      }
      disconnect() {
        /*  */
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.IntersectionObserver = IntersectionObserverMock;
  });

  it('Mostra skeletons enquanto está carregando', () => {
    (usePolicy as any).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<Policy slug="fake-slug" />);

    expect(
      screen.getAllByText('', { selector: '.bg-background-400' }).length,
    ).toBeGreaterThan(0);
  });

  // ---

  it('Mostra os dados da política quando carregado', () => {
    (usePolicy as any).mockReturnValue({
      data: fakePolicy,
      isLoading: false,
    });

    render(<Policy slug="fake-slug" />);

    expect(
      screen.getByRole('link', { name: fakePolicy.title }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: fakePolicy.title }),
    ).toBeInTheDocument();

    expect(screen.getByText(fakePolicy.category.name)).toBeInTheDocument();

    expect(screen.getByText(fakePolicy.source)).toBeInTheDocument();

    expect(screen.getByText('Primeiro parágrafo.')).toBeInTheDocument();
    expect(screen.getByText('Segundo parágrafo.')).toBeInTheDocument();
  });
});
