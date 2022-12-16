import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useApplications } from '../hooks/UseApplication'
import Layout from '../components/Layout';
import ApplicationCard from '../components/ApplicationCard';
import AddApplicationForm from '../components/forms/AddApplicationForm';




const Home: React.FC = () => {
  const { applications, isError, isLoading } = useApplications();
  const [showAddApplication, setShowAddApplication] = useState(false);

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

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
          applications !== undefined && applications.length > 0 ? (
            <div className={styles.grid}> {
              applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  appId={application.id}
                />
              ))
            }
            </div>
          ) : (
            <div>
              <h4>You do not have any apps added.</h4>
            </div>
          )
        )
      }
      <div>
        <button className={styles.addBtn} onClick={() => setShowAddApplication(!showAddApplication)}>
          {
            showAddApplication ? "Back to Apps" : "Add App"
          }
        </button>
      </div>
    </Layout>
  )
}

export default Home;
