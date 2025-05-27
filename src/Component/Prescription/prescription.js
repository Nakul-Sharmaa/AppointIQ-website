import React, { useState } from 'react';

const PrescriptionEditor = ({ userPrescription, onSave }) => {
  const [doctorPrescription, setDoctorPrescription] = useState('');

  const handleSave = () => {
    if (!doctorPrescription.trim()) {
      alert('Please enter a prescription before saving.');
      return;
    }

    onSave(doctorPrescription.trim());
    setDoctorPrescription('');
    alert('Prescription saved successfully.');
  };

  const handleClear = () => {
    setDoctorPrescription('');
  };

  return (
    <div style={styles.container}>
      <h2>User Prescription</h2>
      <div style={styles.box}>
        <p>{userPrescription || 'No prescription provided by the user.'}</p>
      </div>

      <h2>Doctor's Prescription</h2>
      <textarea
        style={styles.textarea}
        rows="6"
        placeholder="Enter your prescription here..."
        value={doctorPrescription}
        onChange={(e) => setDoctorPrescription(e.target.value)}
      />

      <div style={styles.buttonGroup}>
        <button style={styles.clearButton} onClick={handleClear}>
          Clear
        </button>
        <button style={styles.saveButton} onClick={handleSave}>
          Save Prescription
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  box: {
    padding: '15px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  clearButton: {
    backgroundColor: '#ccc',
    color: '#333',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default PrescriptionEditor;
