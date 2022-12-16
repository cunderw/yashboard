import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import ApplicationCard from '../components/ApplicationCard';

import { useState } from 'react';
import { useApplications } from '../hooks/UseApplication'


const Applications: React.FC = () => {
  const { applications, isError, isLoading } = useApplications();
  const [showAddApplication, setShowAddApplication] = useState(false);

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <Grid container spacing={2}>
      {
        applications !== undefined && applications.length > 0 ? (
          applications.map((application) => (
            <Grid key={application.id} item xs={2}>
              <ApplicationCard
                key={application.id}
                appId={application.id}
              />
            </Grid>
          ))
        ) : (
          <Alert severity="warning">You do not have any apps added!</Alert>
        )
      }
    </Grid>
  )
}

export default Applications;
