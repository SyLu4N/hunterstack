import { useEffect } from 'react'; // ← Adicionar esta importação

import { useFavorites } from '@/hooks/useFavorites';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { Mock, vi } from 'vitest';

import { ButtonPolicyFavorite } from './ButtonPolicyFavorite';

const fakePolicy = { slug: 'fake-policy', title: 'Política Fake' } as any;

vi.mock('@/hooks/useFavorites');
vi.mock('use-sound', () => ({
  default: () => [vi.fn(), { stop: vi.fn() }], // ← Mock corrigido
}));

vi.mock('./ui/button', () => ({
  Button: ({ onClick, children }: any) => (
    <button onClick={onClick} data-testid="mock-button">
      {children}
    </button>
  ),
}));

vi.mock('@lottiefiles/dotlottie-react', () => ({
  DotLottieReact: vi.fn().mockImplementation(({ dotLottieRefCallback }) => {
    useEffect(() => {
      const mockPlayer = {
        play: vi.fn(),
        stop: vi.fn(),
        setFrame: vi.fn(),
        isPlaying: false,
        totalFrames: 10,
      };
      dotLottieRefCallback(mockPlayer);

      return () => {
        dotLottieRefCallback(null);
      };
    }, []);

    return null;
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
    cleanup(); // ← Limpa após cada teste
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks(); // ← Reseta todos os mocks após todos os testes
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
