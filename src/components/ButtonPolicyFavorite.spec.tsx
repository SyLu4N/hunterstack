import { useFavorites } from '@/hooks/useFavorites';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { Mock, vi } from 'vitest';

import { ButtonPolicyFavorite } from './ButtonPolicyFavorite';

const fakePolicy = { slug: 'fake-policy', title: 'Política Fake' } as any;

vi.mock('@/hooks/useFavorites');
vi.mock('use-sound', () => ({
  default: () => [vi.fn(), { stop: vi.fn() }],
}));

vi.mock('./ui/button', () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick} data-testid="mock-button">
      {children}
    </button>
  ),
}));

vi.mock('lottie-react', () => ({
  useLottie: () => ({
    View: <div data-testid="lottie" />,
    play: vi.fn(),
    goToAndStop: vi.fn(),
    playSegments: vi.fn(),
    animationItem: { totalFrames: 50, goToAndStop: vi.fn() },
  }),
}));

describe('ButtonPolicyFavorite', () => {
  const setFavorites = vi.fn();

  beforeEach(() => {
    setFavorites.mockClear();
    (useFavorites as Mock).mockReturnValue({
      favorites: [],
      setFavorites,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('Adiciona aos favoritos', () => {
    const { getByTestId } = render(
      <ButtonPolicyFavorite policy={fakePolicy} />,
    );
    fireEvent.click(getByTestId('mock-button'));
    expect(setFavorites).toHaveBeenCalledWith([fakePolicy]);
  });

  // ---

  it('Remove dos favoritos', () => {
    (useFavorites as Mock).mockReturnValue({
      favorites: [fakePolicy],
      setFavorites,
    });
    const { getByTestId } = render(
      <ButtonPolicyFavorite policy={fakePolicy} />,
    );
    fireEvent.click(getByTestId('mock-button'));
    expect(setFavorites).toHaveBeenCalledWith([]);
  });
});
