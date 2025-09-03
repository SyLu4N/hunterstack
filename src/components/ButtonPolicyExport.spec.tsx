import { apiServer } from '@/services/api';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { vi } from 'vitest';

import { ButtonPolicyExport } from './ButtonPolicyExport';

vi.mock('@/services/api');
vi.mock('sonner');

describe('ButtonPolicyExport component', () => {
  const fakePolicy = {
    id: '1',
    slug: 'fake-slug',
    summary: 'Resumo',
    description: 'Descricao',
    source: 'Fonte',
    title: 'Política de Privacidade',
    category: { id: '1', name: 'Privacidade', slug: 'privacidade' },
    createdAt: new Date(),
  };

  const mockApiGet = vi.fn();

  beforeEach(() => {
    (apiServer as any).mockReturnValue({
      get: mockApiGet,
    });
    (toast.loading as any) = vi.fn().mockReturnValue('toast-id');
    (toast.success as any) = vi.fn();
    (toast.error as any) = vi.fn();
  });

  it('Renderiza o botão com ícone de download', () => {
    render(<ButtonPolicyExport policy={fakePolicy} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTitle('Favoritar')).toBeInTheDocument();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  // ---

  it('Chama toast de erro se a exportação falhar', async () => {
    mockApiGet.mockRejectedValue(new Error('fail'));

    render(<ButtonPolicyExport policy={fakePolicy} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Algo deu errado, tente novamente mais tarde',
        { id: 'toast-id' },
      );
    });
  });

  // ---

  it('Desabilita botão enquanto exporta', async () => {
    mockApiGet.mockResolvedValue({ data: new Blob(['PDF']) });

    render(<ButtonPolicyExport policy={fakePolicy} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
