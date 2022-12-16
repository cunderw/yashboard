import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Head from 'next/head';
import { useState } from 'react';
import Applications from '../components/Applications';
import AddApplicationForm from '../components/forms/AddApplicationForm';
import Layout from '../components/Layout';
import PopupModal from '../components/PopupModal';


const Home: React.FC = () => {
  const [openAddApplicationModal, setOpenAddApplicationModal] = useState(false);
  const handleOpenAddApplicationModal = () => setOpenAddApplicationModal(true);
  const handleCloseAddApplicationModal = () => setOpenAddApplicationModal(false);

  return (
    <Layout>
      <Head>
        <title>YaSHBoard</title>
        <meta name="description" content="Yet Another Self Hosted Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PopupModal
        open={openAddApplicationModal}
        handleClose={handleCloseAddApplicationModal}
        title="Add App"
      >
        <AddApplicationForm />
      </PopupModal>
      <Applications />
      <Container maxWidth="sm">
        <Button variant="contained" onClick={handleOpenAddApplicationModal}>Add App</Button>
      </Container>
    </Layout>
  )
}

export default Home;
