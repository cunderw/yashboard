import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import ApplicationCard from '../components/ApplicationCard'
import { useApplications } from '../hooks/UseApplication'

type Props = {
  isEditMode: boolean
}

const Applications: React.FC<Props> = props => {
  const { applications, isError, isLoading } = useApplications()

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  if (applications !== undefined && applications.length > 0) {
    return (
      <Grid container spacing={1}>
        {applications.map(application => (
          <Grid
            key={application.id}
            item
            xs={12}
            sm={6}
            md={2}
            sx={{ minWidth: 275 }}
          >
            <ApplicationCard
              key={application.id}
              appId={application.id}
              isEditMode={props.isEditMode}
            />
          </Grid>
        ))}
      </Grid>
    )
  }

  return <Alert severity="warning">You do not have any apps added!</Alert>
}

export default Applications
