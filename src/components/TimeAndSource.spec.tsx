import * as formatModule from '@/utils/formatDate';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { TimeAndSource } from './TimeAndSource';

describe('TimeAndSource', () => {
  it('Renderiza a data formatada e a fonte corretamente', () => {
    const date = new Date('2025-09-01T12:00:00Z');
    const source = 'Exemplo de Fonte';

    const formatSpy = vi
      .spyOn(formatModule, 'formatDate')
      .mockReturnValue('01/09/2025');

    render(<TimeAndSource date={date} source={source} />);

    expect(screen.getByText('01/09/2025')).toBeInTheDocument();

    expect(screen.getByText(source)).toBeInTheDocument();

    formatSpy.mockRestore();
  });
});
