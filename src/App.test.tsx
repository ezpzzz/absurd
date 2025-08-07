import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { promises as fs } from 'fs'
import path from 'path'
import App from './App'
import { generateSite } from '../scripts/generateSite'

// Mock UUID to make tests deterministic
vi.mock('./utils/id', () => ({
  generateId: () => 'test-uuid-123'
}))

describe('App', () => {
  const routesPath = path.join(process.cwd(), 'src', 'generated', 'routes.ts')
  let originalRoutes = ''

  beforeAll(async () => {
    originalRoutes = await fs.readFile(routesPath, 'utf8')
  })

  afterAll(async () => {
    await fs.writeFile(routesPath, originalRoutes)
    await fs.rm(path.join(process.cwd(), 'src', 'generated', 'test-uuid-123'), {
      recursive: true,
      force: true,
    })
  })
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('navigation', () => {
    it('navigates to generated site on prompt submit', async () => {
      // pre-generate site for deterministic id
      await generateSite({
        id: 'test-uuid-123',
        expiryTimestamp: Date.now(),
        pages: [{ slug: 'index', title: 'Test Heading', body: 'Lorem ipsum' }],
        citations: [],
        charts: [],
      })

      const user = userEvent.setup()
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      )

      const input = screen.getByRole('textbox', { name: /prompt/i })
      const button = screen.getByTestId('submit-button')

      expect(button).toBeDisabled()

      await user.clear(input)
      await user.type(input, 'hello')

      await new Promise(resolve => setTimeout(resolve, 100))

      expect(button).toBeEnabled()
      await user.click(button)

      expect(await screen.findByText('Test Heading')).toBeInTheDocument()
      expect(screen.getByText('Lorem ipsum')).toBeInTheDocument()
    })
  })

  describe('theme toggle', () => {
    it('toggles between light and dark themes', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      )

      const toggleButton = screen.getByTestId('toggle-theme')
      
      // Toggle to dark mode
      await user.click(toggleButton)
      
      // Should show dark mode icon (Brightness7)
      expect(screen.getByTestId('toggle-theme')).toBeInTheDocument()

      // Toggle back to light mode
      await user.click(toggleButton)
      
      // Should show light mode icon (Brightness4)
      expect(screen.getByTestId('toggle-theme')).toBeInTheDocument()
    })

    it('persists theme preference in localStorage', async () => {
      const user = userEvent.setup()
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      )

      const toggleButton = screen.getByTestId('toggle-theme')
      
      // Toggle to dark mode
      await user.click(toggleButton)
      
      // Check localStorage
      expect(localStorage.getItem('color-mode')).toBe('dark')
      
      // Toggle back to light mode
      await user.click(toggleButton)
      expect(localStorage.getItem('color-mode')).toBe('light')
    })

    it('loads theme preference from localStorage', () => {
      // Set dark mode in localStorage
      localStorage.setItem('color-mode', 'dark')
      
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      )

      // Should load dark mode from localStorage
      expect(localStorage.getItem('color-mode')).toBe('dark')
    })
  })

  describe('error handling', () => {
    it('handles localStorage errors gracefully', async () => {
      const user = userEvent.setup()
      // Mock localStorage to throw an error
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('localStorage quota exceeded')
      })

      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
      )

      const input = screen.getByRole('textbox', { name: /prompt/i })
      const button = screen.getByTestId('submit-button')

      await user.clear(input)
      await user.type(input, 'hello')
      
      // Wait for button to be enabled
      await new Promise(resolve => setTimeout(resolve, 100))
      expect(button).toBeEnabled()
      
      await user.click(button)

      // Should show error message
      expect(screen.getByText('Failed to save prompt. Please try again.')).toBeInTheDocument()

      // Restore original method
      Storage.prototype.setItem = originalSetItem
    })
  })
})
