import { useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppBar, CssBaseline, IconButton, Toolbar, Typography, Container } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import PromptPage from './pages/PromptPage'
import SitePage from './pages/SitePage'

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('color-mode') as 'light' | 'dark') || 'light',
  )
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : 'light'
    setMode(next)
    localStorage.setItem('color-mode', next)
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
          <Route path="/site/:id" element={<SitePage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
