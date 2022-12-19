import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Head from 'next/head';
import { useState } from 'react';
import Applications from '../components/Applications';
import AddApplicationForm from '../components/forms/AddApplicationForm';
import Layout from '../components/Layout';
import PopupModal from '../components/PopupModal';


const Home: React.FC = () => {
  const [addAppModalOpen, setAppModalOpen] = useState(false);
  const openAddAppModal = () => {setAppModalOpen(true)};
  const closeAddAppModal = () => setAppModalOpen(false);

  return (
    <Layout openAddAppModal={openAddAppModal}>
      <Head>
        <title>YaSHBoard</title>
        <meta name="description" content="Yet Another Self Hosted Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PopupModal
        open={addAppModalOpen}
        handleClose={closeAddAppModal}
        title="Add App"
      >
        <AddApplicationForm />
      </PopupModal>
      <Applications />
    </Layout>
  )
}

export default Home;
