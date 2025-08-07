import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, CssBaseline, IconButton, Toolbar, Typography, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useLocalStorage } from './hooks/useLocalStorage';
import PromptPage from './pages/PromptPage';
import { generatedRoutes } from './generated/routes';
const App = () => {
    const [mode, setMode] = useLocalStorage('color-mode', 'light');
    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(AppBar, { position: "static", children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", sx: { flexGrow: 1 }, children: "Absurd" }), _jsx(IconButton, { color: "inherit", onClick: toggleTheme, "data-testid": "toggle-theme", children: mode === 'dark' ? _jsx(Brightness7, {}) : _jsx(Brightness4, {}) })] }) }), _jsx(Container, { sx: { mt: 4 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PromptPage, {}) }), generatedRoutes.map(({ path, component: Component }) => (_jsx(Route, { path: path, element: _jsx(Component, {}) }, path)))] }) })] }));
};
export default App;
