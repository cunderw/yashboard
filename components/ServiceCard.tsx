import React, { useState } from 'react';
import styles from "../styles/Service.module.css";

export type ServiceProps = { // Todo 
  id: string;
  name: string;
  url: string;
}

type Props = { // Props
  service: ServiceProps;
  deleteService: Function
}

const ServiceCard: React.FC<Props> = (props) => {
  const [service] = useState(props.service);
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>
        {service.name}
      </h4>
      <p className={styles.description}>
        <span className={styles.url}>{service.url}</span>
      </p>
      <button className={styles.actionBtn} onClick={() => props.deleteService(service.id)}>Delete Service</button>
    </div>
  )
}

export default ServiceCard;
