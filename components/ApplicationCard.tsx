import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import UpdateApplicationForm from '../components/forms/UpdateApplicationForm'
import { useApplication } from '../hooks/UseApplication'
import { ApplicationStatus } from '../models/Application'

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
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
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
      </Box>
      <Box sx={{ m: 2 }}>
        {application?.status === ApplicationStatus.OK ? (
          <CheckCircleIcon />
        ) : (
          <ErrorIcon />
        )}
      </Box>
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
      {showUpdateApplication && props.isEditMode ? (
        <Card variant="outlined" sx={{ display: 'flex' }}>
          {updateCard}
        </Card>
      ) : (
        <Card variant="outlined" sx={{ display: 'flex' }}>
          {card}
        </Card>
      )}
    </Box>
  )
}

export default ApplicationCard
