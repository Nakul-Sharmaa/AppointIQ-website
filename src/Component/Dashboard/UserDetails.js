import React, { useState, useEffect } from "react";
import "./userDetails.css";
import Header from "../Header/Header.js/Header";

export default function PatientDetails({ onBack, selectedindex, token }) {
  const [dataSent, setDataSent] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedindex]);

  const data0 = [
    "No pending patient data found.",
    "No approved patient data found.",
    "No cancelled patient data found",
    "No total patient data found.",
  ];

  const title = [
    "New Appointments",
    "Approved Appointments",
    "Cancelled Appointments",
    "Total Appointments",
  ];

  const api = [
    "http://localhost:8080/api/appointments/doctor/8/pending",
    "http://localhost:8080/api/appointments/doctor/8/approved",
    "http://localhost:8080/api/appointments/doctor/8/denied",
    "http://localhost:8080/api/appointments/doctor/8/all",
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(api[selectedindex], {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Added Authorization here
          "ngrok-skip-browser-warning": "true",
          Accept: "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setDataSent(data);
        console.log(data);
      } else {
        const text = await response.text();
        console.warn("Expected JSON but got:", text);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  // Refresh data after success
  const approve = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/confirm/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert("Appointment approved!");
      fetchData();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  const done = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/done/${id}?isDone=true`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert("Appointment marked as done!");
      fetchData();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  const deny = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/deny/${id}?isDone=true`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      alert("Appointment disapproved!");
      fetchData();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  if (!dataSent || dataSent.length === 0) {
    return (
      <div className="container">
        <Header title={title[selectedindex]} onBack={onBack} />
        <img src="/Images/noresult.png" alt="signup" className="image" />
        <h4 className="h4">{data0[selectedindex]}</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <Header title={title[selectedindex]} onBack={onBack} />
      <div className="details-scroll-container">
        {dataSent.map((patient, index) => (
          <div className="details" key={index}>
            <div className="photo-container">
              <img
                src={`data:image/jpeg;base64,${patient.patientImage}`}
                alt="Doctor"
                className="user-photo"
              />
            </div>
            <div className="info-content">
              <div className="details-text">
                <p>
                  <strong>Name:</strong> {patient.patientName}
                </p>
                <p>
                  <strong>Age:</strong> {patient.patientAge}
                </p>
                <p>
                  <strong>Email:</strong> {patient.patientEmail}
                </p>
                <p>
                  <strong>Contact:</strong> {patient.patientContact}
                </p>
              </div>

              <div className="details-text">
                <p>
                  <strong>Symptoms:</strong> {patient.symptoms}
                </p>
                <p>
                  <strong>Date:</strong> {patient.date}
                </p>
                <p>
                  <strong>Time:</strong> {patient.time}
                </p>
              </div>
            </div>
            {selectedindex === 0 && (
              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => approve(patient.id)}
                >
                  Approve
                </button>

                <button
                  className="disapprove-btn"
                  onClick={() => deny(patient.id)}
                >
                  Disapprove
                </button>
                <button className="done-btn" onClick={() => done(patient.id)}>
                  Checked
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
