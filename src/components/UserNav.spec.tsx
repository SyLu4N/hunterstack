import { useAuth } from '@/hooks/useAuth';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';

import { UserNav } from './UserNav';

const mockPush = vi.fn();
const mockSignOut = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/dashboard',
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('UserNav', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deve renderizar o botão de login quando o usuário não estiver logado', () => {
    (useAuth as unknown as Mock).mockReturnValue({
      user: null,
      signOut: vi.fn(),
    });

    render(<UserNav />);

    expect(
      screen.getByRole('heading', { name: /login com o github/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/login com o github/i)).toBeVisible();
  });

  // ---

  it('Deve redirecionar para o GitHub ao clicar no botão de login', () => {
    (useAuth as unknown as Mock).mockReturnValue({
      user: null,
      signOut: vi.fn(),
    });

    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID = 'FAKE_CLIENT_ID';
    process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI = 'http://localhost:3000';

    render(<UserNav />);

    const button = screen.getByText(/login com o github/i);
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalled();
    const url = mockPush.mock.calls[0][0] as string;

    expect(url).toContain('https://github.com/login/oauth/authorize');
    expect(url).toContain('client_id=FAKE_CLIENT_ID');

    const encodedRedirect = encodeURIComponent(
      'http://localhost:3000/dashboard',
    );

    expect(url).toContain(`redirect_uri=${encodedRedirect}`);
  });

  // ---

  it('Deve renderizar informações do usuário quando logado', () => {
    (useAuth as unknown as Mock).mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'avatar.png',
      },
      signOut: mockSignOut,
    });

    render(<UserNav />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toHaveAttribute(
      'src',
      'avatar.png',
    );
  });

  // ---

  it('Deve chamar signOut ao clicar no ícone de logout', () => {
    (useAuth as unknown as Mock).mockReturnValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'avatar.png',
      },
      signOut: mockSignOut,
    });

    render(<UserNav />);

    const logoutButton = screen.getByTitle('Deslogar');
    fireEvent.click(logoutButton);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
