import { useState } from 'react';

import styles from '../../styles/Form.module.css';

const AddApplication: React.FC = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  const addApplication = () => {
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
      '/api/applications',
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
      setMessage('App added successfully');
    });
  }

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
        <input type="text" name="name" id="name" placeholder='Name of App' value={name} onChange={
          (e) => setName(e.target.value)
        } />
        <input type="text" name="url" id="url" placeholder='URL of App' value={url} onChange={
          (e) => setUrl(e.target.value)
        } />
      </div>
      <div className={styles.formGroup}>
        <button className={styles.addBtn} onClick={() => addApplication()}>Submit</button>
      </div>
    </div>
  )
}

export default AddApplication;
