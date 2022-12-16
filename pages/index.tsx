import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Head from 'next/head';
import { useState } from 'react';
import Applications from '../components/Applications';
import AddApplicationForm from '../components/forms/AddApplicationForm';
import Layout from '../components/Layout';


const Home: React.FC = () => {
  const [showAddApplication, setShowAddApplication] = useState(false);

  return (
    <Layout>
      <Head>
        <title>YaSHBoard</title>
        <meta name="description" content="Yet Another Self Hosted Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        showAddApplication ? (
          <AddApplicationForm />
        ) : (
          <Applications />
        )
      }
      <Container maxWidth="sm">
        <Button variant="contained" onClick={() => setShowAddApplication(!showAddApplication)}>
          {
            showAddApplication ? "Back to Apps" : "Add App"
          }
        </Button>
      </Container>
    </Layout>
  )
}

export default Home;
