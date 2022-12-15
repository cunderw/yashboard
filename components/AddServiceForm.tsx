import { useState } from 'react';

import styles from '../styles/Form.module.css';

type Props = {
  addService: Function;
}

const AddService: React.FC<Props> = ({ addService: addService }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required');
      return;
    }
    if (!url) {
      setError('URL is required');
      return;
    }
    const data = {
      name,
      url
    };
    fetch(
      '/api/service',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }
    ).then((response) => response.json()).then((data) => {
      setName('');
      setUrl('');
      setMessage('Service added successfully');
      addService(data);
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
          <input type="text" name="name" id="name" placeholder='Name of Service' value={name} onChange={
            (e) => setName(e.target.value)
          } />
          <input type="text" name="url" id="url" placeholder='Url of Service' value={url} onChange={
            (e) => setUrl(e.target.value)
          } />
        </div>
        <div className={styles.formGroup}>
          <button type="submit">Add Service</button>
        </div>
      </form>
    </div>
  )
}

export default AddService;
