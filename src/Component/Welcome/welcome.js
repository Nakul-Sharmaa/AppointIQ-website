// /components/WelcomeScreen.js
import React,{useState} from "react";
import "./welcome.css";
import DoctorRegistrationForm from "./Step1";

const WelcomeScreen = () => {
   const [showForm, setShowForm] = useState(false);
  return (
    <div className="welcome-container">
      <div style={{flex:1,height:"100%",width:"30%",alignContent:"center",justifyContent:"center"}}>
        {showForm ? (
          <DoctorRegistrationForm />
        ) : (
          <div className="welcome-content">
            <h1>CHAMPIONS CLUB</h1>
            <p className="subtitle">Hello there!</p>
            <p className="description">
              Please fill the details in this doctor registration form.
            </p>
            <button className="cta-button" onClick={() => setShowForm(true)}>
              SURE <span role="img" aria-label="smile">😊</span> <span className="arrow">➔</span>
            </button>
            <div className="Login">
             <h5> Already have an account? <span className="span">
              Login</span></h5> 
              </div>
          </div>
        )}
      </div>

      <div
        className="Welcome-img"
        style={{
          flex: 1,
          height: '100%',
          backgroundImage: `url('/Images/nurse.png')`,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '8px',
        }}
      ></div>
    </div> 
  );
};

export default WelcomeScreen;
