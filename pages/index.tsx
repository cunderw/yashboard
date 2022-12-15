import useSWR from 'swr'
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import ServiceCard, { ServiceProps } from '../components/ServiceCard';
import AddServiceForm from '../components/forms/AddServiceForm';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: React.FC = () => {
  const { data, error, isLoading } = useSWR<ServiceProps[], Error>('/api/service', fetcher, { refreshInterval: 1000 });
  const [showAddService, setShowAddService] = useState(false);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>YaSHBoard</title>
        <meta name="description" content="Yet Another Self Hosted Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        showAddService ? (
          <AddServiceForm/>
        ) : (
          data !== undefined && data.length > 0 ? (
            <div className={styles.grid}> {
              data.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))
            }
            </div>
          ) : (
            <div>
              <h4>You do not have any services added.</h4>
            </div>
          )
        )
      }
      <div>
        <button className={styles.addServiceBtn} onClick={() => setShowAddService(!showAddService)}>
          {
            showAddService ? "Back to Services" : "Add Service"
          }
        </button>
      </div>
    </Layout>
  )
}

export default Home;
