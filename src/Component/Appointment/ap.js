import React, { useState } from 'react';

const TodayAppointments = ({ appointments }) => {
    const today = new Date().toISOString().split('T')[0];
    const todaysAppointments = appointments.filter(app => app.date === today);

    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [scheduledAppointment, setScheduledAppointment] = useState(null);

    const isSubmitDisabled = () => {
        if (!newDate) return true;
        if ((startTime && !endTime) || (!startTime && endTime)) return true;
        return false;
    };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        let finalStartTime = startTime;
        let finalEndTime = endTime;
        if (!startTime && !endTime) {
            finalStartTime = "00:00";
            finalEndTime = "00:00";
        }
        setScheduledAppointment({ date: newDate, startTime: finalStartTime, endTime: finalEndTime });
        setShowScheduleForm(false);
        fetch('http://nakullllllll.com/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: newDate, startTime: finalStartTime, endTime: finalEndTime })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Today's Appointments</h2>
            {todaysAppointments.length === 0 ? (
                <>
                    <p style={styles.noData}>No appointments scheduled for today.</p>
                    <button style={styles.scheduleButton} onClick={() => setShowScheduleForm(true)}>
                        Schedule Appointment
                    </button>
                    {showScheduleForm && (
                        <form onSubmit={handleScheduleSubmit} style={styles.scheduleForm}>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Date:</label>
                                <input
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    required
                                    style={styles.formInput}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Start Time:</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    style={styles.formInput}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>End Time:</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    style={styles.formInput}
                                />
                            </div>
                            <button type="submit" style={styles.submitButton} disabled={isSubmitDisabled()}>
                                Submit
                            </button>
                        </form>
                    )}
                    {scheduledAppointment && (
                        <div style={styles.confirmation}>
                            <p>
                                Appointment are accepting from {scheduledAppointment.date} from {scheduledAppointment.startTime} to {scheduledAppointment.endTime}.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                todaysAppointments.map((app, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.photoContainer}>
                            <img
                                src={`data:image/jpeg;base64,${app.patientImage}`}
                                alt="Patient"
                                style={styles.userPhoto}
                            />
                        </div>
                        <div style={styles.infoContent}>
                            <div style={styles.detailsText}>
                                <p><strong>Name:</strong> {app.patientName}</p>
                                <p><strong>Age:</strong> {app.patientAge}</p>
                                <p><strong>Email:</strong> {app.patientEmail}</p>
                                <p><strong>Contact:</strong> {app.patientContact}</p>
                            </div>
                            <div style={styles.detailsText}>
                                <p><strong>Symptoms:</strong> {app.symptoms}</p>
                                <p><strong>Date:</strong> {app.date}</p>
                                <p><strong>Time:</strong> {app.startTime} - {app.endTime}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
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
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        background: '#fff',
        padding: '2rem',
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    photoContainer: {
        flex: 1,
        minWidth: 180,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userPhoto: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
        border: '3px solid #ccc',
        flexShrink: 0,
    },
    infoContent: {
        display: 'flex',
        gap: '2rem',
        flex: 1,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    detailsText: {
        flex: 1,
        minWidth: 250,
    },
    noData: {
        textAlign: 'center',
        color: '#888',
    },
    scheduleButton: {
        backgroundColor: '#ad68ad',
        color: '#fff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '1rem'
    },
    scheduleForm: {
        marginTop: '1rem',
        background: '#f9f9f9',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '80%',
        maxWidth: '400px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '0.5rem'
    },
    formLabel: {
        marginBottom: '0.25rem',
        fontWeight: 'bold'
    },
    formInput: {
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
        marginTop: '0.5rem'
    },
    confirmation: {
        marginTop: '1rem',
        backgroundColor: '#e0ffe0',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        color: '#2e7d32',
        fontWeight: 'bold'
    }
};

export default TodayAppointments;
