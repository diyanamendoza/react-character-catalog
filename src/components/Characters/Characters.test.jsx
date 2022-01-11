import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Characters from './Characters';

it('should display a list of characters', () => {
  const { container } = render(
    <MemoryRouter>
      <Characters
        characters={[{
          image: 'https://placebear.com/200/300',
          name: 'Ted',
          species: 'bear',
          status: 'Alive',
        }]}
      />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
  screen.getByText(/Ted/i)
});
