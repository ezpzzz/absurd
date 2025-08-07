import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppBar, CssBaseline, IconButton, Toolbar, Typography, Container } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useLocalStorage } from './hooks/useLocalStorage'
import PromptPage from './pages/PromptPage'
import { generatedRoutes } from './generated/routes'

const App = () => {
  const [mode, setMode] = useLocalStorage<'light' | 'dark'>('color-mode', 'light')
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Absurd
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme} data-testid="toggle-theme">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<PromptPage />} />
          {generatedRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
