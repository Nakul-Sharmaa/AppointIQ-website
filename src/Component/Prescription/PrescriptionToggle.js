import React, { useState } from 'react';

const PrescriptionToggle = ({ onSubmit }) => {
    const [mode, setMode] = useState('free'); // 'free' or 'paid'
    const [showPrescription, setShowPrescription] = useState(false);
    const [prescription, setPrescription] = useState('');

    const handleSubmit = () => {
        if (!prescription.trim()) {
            alert("Please enter a prescription.");
            return;
        }

        alert("Prescription Submitted");
        setShowPrescription(false);
        setPrescription('');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Select Prescription Type</h2>

            <div style={styles.toggleGroup}>
                <button
                    style={mode === 'free' ? styles.activeToggle : styles.toggle}
                    onClick={() => setMode('free')}
                >
                    Free
                </button>
                <button
                    style={mode === 'paid' ? styles.activeToggle : styles.toggle}
                    onClick={() => setMode('paid')}
                >
                    Paid
                </button>
            </div>

            <div className="details">
                <div className="photo-container">
                    <img
                        src={`data:image/jpeg;base64,dbfkjdbfk}`}
                        alt="Doctor"
                        className="user-photo"
                    />
                </div>

                <div className="info-content">
                    <div className="details-text">
                        <p><strong>Name:</strong> nrehno</p>
                        <p><strong>Age:</strong> erg</p>
                        <p><strong>Email:</strong> rg</p>
                        <p><strong>Contact:</strong> reg</p>
                    </div>

                    <div className="details-text">
                        <p><strong>Symptoms:</strong> erg</p>
                        <p><strong>Date:</strong> ergt</p>
                        <p><strong>Time:</strong> jhjh</p>
                    </div>
                </div>

             <div className="action-buttons">
  <div style={styles.boxWithButton}>
    <p style={{ margin: 0 }}>fjehfjwehkrf</p>
    <button style={styles.approveButton} onClick={() => setShowPrescription(true)}>
      Add Prescription
    </button>
  </div>
    {showPrescription && (
                <div style={{ width: '100%' }}>
<textarea
    placeholder="Enter prescription here..."
    value={prescription}
    onChange={(e) => setPrescription(e.target.value)}
    style={styles.textarea}
    rows="5"
/>
<div style={styles.buttonGroup}>
    <button onClick={handleSubmit} style={styles.submitButton}>
        Submit Prescription
    </button>
    <button onClick={() => {
        setPrescription('');
        setShowPrescription(false);
    }} style={styles.discardButton}>
        Discard
    </button>
</div>

                </div>
            )}
</div>

            </div>

          
        </div>
    );
};


const styles = {
    container: {
        width: '100%',
        background: 'linear-gradient(to bottom, #ffffff, #ad68ad)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    },

    heading: {
        marginTop: '2%',
        marginBottom: "2%"
    },

    toggleGroup: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f3e8f3',
        borderRadius: '50px',
        padding: '5px',
        marginBottom: '20px',
        width: '70%',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
        gap: '10px', // space between buttons
    },

    toggle: {
        flex: 1,
        padding: '15px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#940d96',
        fontSize: '30px',
        fontWeight: 'bold',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
boxWithButton: {
  padding: '15px',
  width: "50%",
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px'
},
approveButton: {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '8px 12px',
  fontSize: '14px',
  cursor: 'pointer',
},

    activeToggle: {
        flex: 1,
        padding: '15px 20px',
        backgroundColor: 'rgba(148, 13, 150, 0.45)',
        color: '#ffffff',
        fontSize: '30px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    },

    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '2px',
        fontSize: '16px',
    },
    buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '10px',
},

discardButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#dc3545',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
},

    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '15px',
        fontSize: '16px',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#28a745',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    box: {
        padding: '15px',
        width: "50%",
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '20px',
    },
};

export default PrescriptionToggle;
