import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const AddApplication: React.FC = () => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const addApplication = () => {
    if (!name) {
      setError('Name is required')
      return
    }
    if (!url) {
      setError('URL is required')
      return
    }
    const data = {
      name,
      url,
    }
    fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        setName('')
        setUrl('')
        setMessage('App added successfully')
      })
  }

  return (
    <Container maxWidth="sm">
      {' '}
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          variant="outlined"
          id="name-input"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          id="url-input"
          label="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Button variant="contained" onClick={() => addApplication()}>
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default AddApplication
