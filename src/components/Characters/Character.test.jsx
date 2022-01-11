import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Character from './Character';

it('should display the provided character', () => {
  const { container } = render(
    <MemoryRouter>
      <Character
        character={{
          image: 'https://placebear.com/200/300',
          name: 'Ted',
          species: 'bear',
          status: 'Alive',
        }}
      />
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
  screen.getByText(/Ted/i)
});
