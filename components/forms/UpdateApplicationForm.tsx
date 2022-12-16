import { useState } from 'react';
import { useApplication } from '../../hooks/UseApplication'
import styles from '../../styles/Form.module.css';

type Props = {
  appId: string;
}

const UpdateApplication: React.FC<Props> = (props) => {
  const { application, isError, isLoading } = useApplication(props.appId);
  const [name, setName] = useState(application?.name);
  const [url, setUrl] = useState(application?.url);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const updateApplication = (id: string) => {
    if (!name) {
      setError('Name is required');
      return;
    }
    if (!url) {
      setError('URL is required');
      return;
    }
    const data = {
      id,
      name,
      url
    };
    fetch(
      '/api/applications/',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then((response) => response.json()).then((data) => {
      setMessage('App updated successfully');
    });
  }

  const deleteApplication = async (id: string) => {
    const data = {
      id
    }
    fetch(
      '/api/applications/',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then((response) => response.json()).then((data) => {
      setMessage('App updated successfully');
    });
  }

  if (isError || application === undefined) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className={styles.formContainer}>
      {
        error && (
          <div className={styles.formGroupError}>
            {
              error
            }
          </div>
        )
      }
      {
        message && (
          <div className={styles.formGroupSuccess}>
            {
              message
            }
          </div>
        )
      }
      <div className={styles.formGroup}>
        <input type="text" name="name" id="name" placeholder='Name' value={name} onChange={
          (e) => setName(e.target.value)
        } />
        <input type="text" name="url" id="url" placeholder='URL' value={url} onChange={
          (e) => setUrl(e.target.value)
        } />
      </div>
      <div className={styles.formGroup}>
        <button className={styles.addBtn} onClick={() => updateApplication(application.id)}>Update</button>
        <button className={styles.addBtn} onClick={() => deleteApplication(application.id)}>Delete</button>
      </div>
    </div>
  )
}

export default UpdateApplication;

