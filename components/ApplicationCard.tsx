import React, { useState } from 'react';
import styles from "../styles/Application.module.css";
import { useApplication } from '../hooks/UseApplication'
import UpdateApplicationForm from '../components/forms/UpdateApplicationForm';

type Props = { // Props
  appId: string;
}


const ApplicationCard: React.FC<Props> = (props) => {
  const { application, isError, isLoading } = useApplication(props.appId);
  const [showUpdateApplication, setShowUpdateApplication] = useState(false);

  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    showUpdateApplication ? (
      <div className={styles.card}>
        <UpdateApplicationForm
          appId={props.appId}
        />
        <button className={styles.actionBtn} onClick={() => setShowUpdateApplication(!showUpdateApplication)}>Edit</button>
      </div>
    ) : (
      <div className={styles.card}>
        <h4 className={styles.title}>
          {application?.name}
        </h4>
        <p className={styles.description}>
          <span className={styles.url}>{application?.url}</span>
        </p>
        <button className={styles.actionBtn} onClick={() => setShowUpdateApplication(!showUpdateApplication)}>Edit</button>
      </div>
    )
  )
}

export default ApplicationCard;
