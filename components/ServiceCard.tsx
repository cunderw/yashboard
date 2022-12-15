import React, { useState } from 'react';
import styles from "../styles/Service.module.css";
import UpdateServiceForm from '../components/forms/UpdateServiceForm';

export type ServiceProps = { // Todo 
  id: string;
  name: string;
  url: string;
}

type Props = { // Props
  service: ServiceProps;
}


const ServiceCard: React.FC<Props> = (props) => {
  const [service] = useState(props.service);
  const [showUpdateService, setShowUpdateService] = useState(false);

  return (
    showUpdateService ? (
      <div className={styles.card}>
        <UpdateServiceForm
          service={props.service}
        />
        <button className={styles.actionBtn} onClick={() => setShowUpdateService(!showUpdateService)}>Edit</button>
      </div>
    ) : (
      <div className={styles.card}>
        <h4 className={styles.title}>
          {service.name}
        </h4>
        <p className={styles.description}>
          <span className={styles.url}>{service.url}</span>
        </p>
        <button className={styles.actionBtn} onClick={() => setShowUpdateService(!showUpdateService)}>Edit</button>
      </div>
    )
  )
}

export default ServiceCard;
