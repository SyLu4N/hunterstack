import { render, screen } from '@testing-library/react';

import { EmptyPolicy } from './EmptyPolicy';

describe('EmptyPolicy', () => {
  it('Deve renderizar a imagem, título e descrição', () => {
    render(<EmptyPolicy />);

    const image = screen.getByAltText(
      'Imagem de um robo dormindo, ilustrando uma página vazia',
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/empty.png');

    const title = screen.getByText('Não tem nada aqui!');
    expect(title).toBeInTheDocument();

    const description = screen.getByText(
      /Ainda não temos políticas salvas, verifique o filtro ou tente novamente mais tarde./i,
    );
    expect(description).toBeInTheDocument();
  });
});
