import * as favoritesStorage from '@/localStorage/favorites';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { ButtonPolicyFavorite } from './ButtonPolicyFavorite';

vi.mock('use-sound', () => ({
  default: () => [vi.fn()],
}));

vi.mock('@lottiefiles/dotlottie-react', () => {
  return {
    DotLottieReact: ({ dotLottieRefCallback }: any) => {
      const mockPlayer = {
        play: vi.fn(),
        stop: vi.fn(),
        setFrame: vi.fn(),
        isPlaying: false,
        totalFrames: 10,
      };
      dotLottieRefCallback(mockPlayer);
      return <div data-testid="dotlottie" />;
    },
  };
});

describe('ButtonPolicyFavorite', () => {
  const fakePolicy = { slug: 'fake-policy', title: 'Política Fake' } as any;

  beforeEach(() => {
    vi.spyOn(favoritesStorage, 'fetchFavorites').mockReturnValue([]);
    vi.spyOn(favoritesStorage, 'setFavorites').mockImplementation(vi.fn());
    vi.spyOn(favoritesStorage, 'removeFavorites').mockImplementation(vi.fn());
  });

  it('Renderiza o botão', () => {
    render(<ButtonPolicyFavorite policy={fakePolicy} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('dotlottie')).toBeInTheDocument();
  });

  // ---

  it('Adiciona aos favoritos se não estiver favoritado', () => {
    render(<ButtonPolicyFavorite policy={fakePolicy} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(favoritesStorage.setFavorites).toHaveBeenCalledWith(fakePolicy);
  });
  // ---

  it('Remove dos favoritos se já estiver favoritado', () => {
    vi.spyOn(favoritesStorage, 'fetchFavorites').mockReturnValue([fakePolicy]);

    render(<ButtonPolicyFavorite policy={fakePolicy} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(favoritesStorage.removeFavorites).toHaveBeenCalledWith(
      fakePolicy.slug,
    );
  });
});
