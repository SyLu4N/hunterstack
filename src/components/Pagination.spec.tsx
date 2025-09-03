import { render, screen } from '@testing-library/react';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('Deve renderizar páginas corretamente e botões anterior/próximo', () => {
    render(
      <Pagination
        totalCountOfRegister={50}
        registerPerPage={10}
        currentPage={3}
      />,
    );

    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toBeInTheDocument();
    expect(currentPageButton).toHaveAttribute(
      'class',
      expect.stringContaining('cursor-default'),
    );

    const previousButton = screen.getByText(/Anterior/i);
    expect(previousButton).toBeInTheDocument();

    const nextButton = screen.getByText(/Próximo/i);
    expect(nextButton).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
