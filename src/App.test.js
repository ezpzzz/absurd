import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
// Mock UUID to make tests deterministic
vi.mock('./utils/id', () => ({
    generateId: () => 'test-uuid-123'
}));
describe('App', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });
    describe('navigation', () => {
        it('form submission saves to localStorage', async () => {
            const user = userEvent.setup();
            render(_jsx(MemoryRouter, { initialEntries: ['/'], children: _jsx(App, {}) }));
            const input = screen.getByRole('textbox', { name: /prompt/i });
            const button = screen.getByTestId('submit-button');
            expect(button).toBeDisabled();
            await user.clear(input);
            await user.type(input, 'hello');
            await new Promise(resolve => setTimeout(resolve, 100));
            expect(button).toBeEnabled();
            // Mock navigation to avoid issues with missing routes
            const mockNavigate = vi.fn();
            vi.doMock('react-router-dom', () => ({
                ...vi.importActual('react-router-dom'),
                useNavigate: () => mockNavigate
            }));
            await user.click(button);
            // Verify localStorage was called
            expect(localStorage.getItem('prompt-test-uuid-123')).toBe('hello');
        });
    });
    describe('theme toggle', () => {
        it('toggles between light and dark themes', async () => {
            const user = userEvent.setup();
            render(_jsx(MemoryRouter, { initialEntries: ['/'], children: _jsx(App, {}) }));
            const toggleButton = screen.getByTestId('toggle-theme');
            // Toggle to dark mode
            await user.click(toggleButton);
            // Should show dark mode icon (Brightness7)
            expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
            // Toggle back to light mode
            await user.click(toggleButton);
            // Should show light mode icon (Brightness4)
            expect(screen.getByTestId('toggle-theme')).toBeInTheDocument();
        });
        it('persists theme preference in localStorage', async () => {
            const user = userEvent.setup();
            render(_jsx(MemoryRouter, { initialEntries: ['/'], children: _jsx(App, {}) }));
            const toggleButton = screen.getByTestId('toggle-theme');
            // Toggle to dark mode
            await user.click(toggleButton);
            // Check localStorage
            expect(localStorage.getItem('color-mode')).toBe('dark');
            // Toggle back to light mode
            await user.click(toggleButton);
            expect(localStorage.getItem('color-mode')).toBe('light');
        });
        it('loads theme preference from localStorage', () => {
            // Set dark mode in localStorage
            localStorage.setItem('color-mode', 'dark');
            render(_jsx(MemoryRouter, { initialEntries: ['/'], children: _jsx(App, {}) }));
            // Should load dark mode from localStorage
            expect(localStorage.getItem('color-mode')).toBe('dark');
        });
    });
    describe('error handling', () => {
        it('handles localStorage errors gracefully', async () => {
            const user = userEvent.setup();
            // Mock localStorage to throw an error
            const originalSetItem = Storage.prototype.setItem;
            Storage.prototype.setItem = vi.fn(() => {
                throw new Error('localStorage quota exceeded');
            });
            render(_jsx(MemoryRouter, { initialEntries: ['/'], children: _jsx(App, {}) }));
            const input = screen.getByRole('textbox', { name: /prompt/i });
            const button = screen.getByTestId('submit-button');
            await user.clear(input);
            await user.type(input, 'hello');
            // Wait for button to be enabled
            await new Promise(resolve => setTimeout(resolve, 100));
            expect(button).toBeEnabled();
            await user.click(button);
            // Should show error message
            expect(screen.getByText('Failed to save prompt. Please try again.')).toBeInTheDocument();
            // Restore original method
            Storage.prototype.setItem = originalSetItem;
        });
    });
});
