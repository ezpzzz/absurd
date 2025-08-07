import { useParams, Navigate } from 'react-router-dom'
import { Typography, Alert, Box } from '@mui/material'
import { getLocalStorageItem } from '../hooks/useLocalStorage'

const SitePage = () => {
  const { id } = useParams<{ id: string }>()
  
  if (!id) {
    return <Navigate to="/" replace />
  }
  
  const prompt = getLocalStorageItem(`prompt-${id}`)
  
  if (!prompt) {
    return (
      <Box>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Prompt not found. It may have been removed or expired.
        </Alert>
        <Typography variant="h4" gutterBottom>
          Site {id}
        </Typography>
        <Typography data-testid="placeholder">No prompt available</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Site {id}
      </Typography>
      <Typography data-testid="placeholder">Placeholder for "{prompt}"</Typography>
    </Box>
  )
}

export default SitePage
