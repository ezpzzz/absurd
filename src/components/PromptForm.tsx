import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'

const PromptForm = () => {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = '123' // TODO: replace with real ID generator
    localStorage.setItem(`prompt-${id}`, prompt)
    navigate(`/site/${id}`)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
        multiline
        minRows={3}
        data-testid="prompt-input"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!prompt}
        data-testid="submit-button"
      >
        Generate
      </Button>
    </Box>
  )
}

export default PromptForm
