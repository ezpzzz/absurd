import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import '@testing-library/jest-dom'

describe('navigation', () => {
  it('navigates to site page on prompt submit', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    await userEvent.type(screen.getByTestId('prompt-input'), 'hello')
    await userEvent.click(screen.getByTestId('submit-button'))

    expect(await screen.findByText('Site 123')).toBeInTheDocument()
    expect(screen.getByTestId('placeholder')).toHaveTextContent('hello')
  })
})
