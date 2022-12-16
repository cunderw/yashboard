import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useApplication } from '../../hooks/UseApplication';

type Props = {
  appId: string;
}

const UpdateApplication: React.FC<Props> = (props) => {
  const { application, isError, isLoading } = useApplication(props.appId);
  const [name, setName] = useState(application?.name);
  const [url, setUrl] = useState(application?.url);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const updateApplication = (id: string) => {
    if (!name) {
      setError('Name is required');
      return;
    }
    if (!url) {
      setError('URL is required');
      return;
    }
    const data = {
      id,
      name,
      url
    };
    fetch(
      '/api/applications/',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then((response) => response.json()).then((data) => {
      setMessage('App updated successfully');
    });
  }

  const deleteApplication = async (id: string) => {
    const data = {
      id
    }
    fetch(
      '/api/applications/',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then((response) => response.json()).then((data) => {
      setMessage('App updated successfully');
    });
  }

  if (isError || application === undefined) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <Container maxWidth="sm">  {
        error && (
          <Alert severity="error">{error}</Alert>
        )
      }
      {
        message && (
          <Alert severity="success">{message}</Alert>
        )
      }
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField variant="outlined" id="name-input" label='Name' value={name} onChange={
          (e) => setName(e.target.value)
        } />
        <TextField variant="outlined" id="url-input" label='URL' value={url} onChange={
          (e) => setUrl(e.target.value)
        } />
        <Button variant="contained" onClick={() => updateApplication(application.id)}>Update</Button>
        <Button variant="contained" onClick={() => deleteApplication(application.id)}>Delete</Button>
      </Box>
    </Container>
  )
}

export default UpdateApplication;

