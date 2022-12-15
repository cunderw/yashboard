import { useState } from 'react';

import styles from '../../styles/Form.module.css';

export type ServiceProps = { // Todo 
  id: string;
  name: string;
  url: string;
}

type Props = {
  service: ServiceProps;
}

const UpdateService: React.FC<Props> = (props) => {
  const [service] = useState(props.service);
  const [name, setName] = useState(service.name);
  const [url, setUrl] = useState(service.url);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: any) => {
    if (!name) {
      setError('Name is required');
      return;
    }
    if (!url) {
      setError('URL is required');
      return;
    }
    const id = service.id;
    const data = {
      id,
      name,
      url
    };
    fetch(
      '/api/service/',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then((response) => response.json()).then((data) => {
      setMessage('Service updated successfully');
    });
  }

  const deleteService = async () => {
    const id = service.id
    const data = {
      id
    }
    fetch(
      '/api/service/',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then((response) => response.json()).then((data) => {
      setMessage('Service updated successfully');
    });
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Submit</button>
        </div>
      </form>
      <form onSubmit={deleteService}>
          <button type="submit">Delete</button>
      </form>
    </div>
  )
}

export default UpdateService;

