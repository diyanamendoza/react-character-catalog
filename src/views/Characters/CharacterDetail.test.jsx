import { screen, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../../App'

const server = setupServer(
    rest.get('https://rickandmortyapi.com/api/character/1', (req, res, ctx) => {
        return res(
          ctx.json({
            name: 'Abe',
            status: 'Alive',
            species: 'bear',
            image: 'https://placebear.com/200/300'
          })
        )
      })
    )

describe('CharacterDetail', () => {
    beforeAll(() => {
        server.listen()
        })
          
     afterAll(() => {
        server.close()
        })
          
    it('should show character details', async () => {
        render(
        <MemoryRouter initialEntries={['/characters/1']}>
            <App />
        </MemoryRouter>
        )
            
        screen.getByText('Loading character...')
            
        await screen.findByText('Abe')
     })

})
