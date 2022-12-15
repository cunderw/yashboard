import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import ServiceCard, { ServiceProps } from '../components/ServiceCard';
import AddServiceForm from '../components/AddServiceForm';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {

  const services = await prisma.service.findMany({
  });

  return {
    props: { services: services },
  }
}

type Props = {
  services: ServiceProps[]
}

const Home: React.FC<Props> = (props) => {
  const [showAddService, setShowAddService] = useState(false);
  const [services, setServices] = useState(props.services);

  function addService(service: ServiceProps) {
    setServices([...services, service]);
  }

  async function deleteService(id: string) {
    const data = {
      id
    }
    console.log(data)
    const request = await fetch(
      '/api/service/',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

    const response = await request.json();

    if (response) {
      setServices(
        services.filter(service => service.id !== id)
      );
    }
  }

  return (
    <Layout>
      <Head>
        <title>YaSHBoard</title>
        <meta name="description" content="Yet Another Self Hosted Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        showAddService ? (
          <AddServiceForm addService={addService} />
        ) : (
          services.length > 0 ? (
            <div className={styles.grid}> {
              services.map((service) => (
                <ServiceCard key={service.id} service={service} deleteService={deleteService} />
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
