import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PromptForm from '../PromptForm'
import { setLocalStorageItem } from '../../hooks/useLocalStorage'
import { generateId } from '../../utils/id'
import { useNavigate } from 'react-router-dom'

jest.mock('../../hooks/useLocalStorage', () => ({
  setLocalStorageItem: jest.fn(),
}))

jest.mock('../../utils/id', () => ({
  generateId: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

test('saves prompt and navigates on success', async () => {
  const user = userEvent.setup()
  ;(setLocalStorageItem as jest.Mock).mockReturnValue(true)
  ;(generateId as jest.Mock).mockReturnValue('abc')
  const navigate = jest.fn()
  ;(useNavigate as jest.Mock).mockReturnValue(navigate)

  render(<PromptForm />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'hello' } })
  
  const button = screen.getByTestId('submit-button')
  expect(button).not.toBeDisabled()
  await user.click(button)

  expect(setLocalStorageItem).toHaveBeenCalledWith('prompt-abc', 'hello')
  expect(navigate).toHaveBeenCalledWith('/site/abc')
})

test('shows error when saving fails', async () => {
  const user = userEvent.setup()
  ;(setLocalStorageItem as jest.Mock).mockReturnValue(false)
  ;(generateId as jest.Mock).mockReturnValue('abc')
  const navigate = jest.fn()
  ;(useNavigate as jest.Mock).mockReturnValue(navigate)

  render(<PromptForm />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'hello' } })
  
  const button = screen.getByTestId('submit-button')
  expect(button).not.toBeDisabled()
  await user.click(button)

  expect(screen.getByText('Failed to save prompt. Please try again.')).toBeInTheDocument()
  expect(navigate).not.toHaveBeenCalled()
})
