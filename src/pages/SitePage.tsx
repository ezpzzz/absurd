import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'

const SitePage = () => {
  const { id } = useParams()
  const prompt = id ? localStorage.getItem(`prompt-${id}`) : ''

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Site {id}
      </Typography>
      <Typography data-testid="placeholder">Placeholder for "{prompt}"</Typography>
    </div>
  )
}

export default SitePage
