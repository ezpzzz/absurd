import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Alert } from '@mui/material'
import { generateId } from '../utils/id'
import { setLocalStorageItem } from '../hooks/useLocalStorage'

const PromptForm = () => {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const id = generateId()
    const success = setLocalStorageItem(`prompt-${id}`, prompt)
    
    if (success) {
      navigate(`/site/${id}`)
    } else {
      setError('Failed to save prompt. Please try again.')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
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
