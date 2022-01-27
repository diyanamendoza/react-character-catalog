import { screen, render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from '../../App'

const mockCharList = { 
    info: { pages: 1 }, 
    results: [
        { id: 1, image: 'https://placebear.com/200/300', name: 'Abe', species: 'bear', status: 'Alive' },
        { id: 2, image: 'https://placebear.com/200/300', name: 'Bob', species: 'bear', status: 'Dead' },
    ]}


const server = setupServer(
    rest.get(`https://rickandmortyapi.com/api/character`, (req, res, ctx) => {
        return res(ctx.json(mockCharList))
    })
)

describe('CharacterList', () => {
    beforeAll(() => { 
    server.listen() 
    })

    afterAll(() => { 
    server.close() 
    })

    it('should render a list of characters', async () => {
        render(
        <MemoryRouter initialEntries={['/characters']}>
            <App />
        </MemoryRouter>)
        screen.getByAltText(/loading characters/i)

        await screen.findByText('Abe')
    })
})