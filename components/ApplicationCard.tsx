import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import UpdateApplicationForm from '../components/forms/UpdateApplicationForm'
import { useApplication } from '../hooks/UseApplication'

type Props = {
  // Props
  appId: string
  isEditMode: boolean
}

const ApplicationCard: React.FC<Props> = props => {
  const { application, isError, isLoading } = useApplication(props.appId)
  const [showUpdateApplication, setShowUpdateApplication] = useState(false)

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const openInNewTab = (url: string | URL | undefined) => {
    if (!props.isEditMode) {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
  }

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" noWrap>
          {application?.url}
        </Typography>
        <Typography variant="h5" noWrap>
          {application?.name}
        </Typography>
      </CardContent>
      {props.isEditMode ? (
        <CardActions>
          <Button
            size="small"
            onClick={() => setShowUpdateApplication(!showUpdateApplication)}
          >
            Edit
          </Button>
        </CardActions>
      ) : (
        <CardActions />
      )}
    </React.Fragment>
  )

  const updateCard = (
    <React.Fragment>
      <CardContent>
        <UpdateApplicationForm appId={props.appId} />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => setShowUpdateApplication(!showUpdateApplication)}
        >
          Done
        </Button>
      </CardActions>
    </React.Fragment>
  )

  return (
    <Box onClick={() => openInNewTab(application?.url)}>
      <Paper>
        {showUpdateApplication && props.isEditMode ? (
          <Card variant="outlined">{updateCard}</Card>
        ) : (
          <Card variant="outlined">{card}</Card>
        )}
      </Paper>
    </Box>
  )
}

export default ApplicationCard
