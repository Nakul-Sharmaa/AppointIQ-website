import React, { useState } from 'react';
import './Login.css';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Email and password icons
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8080/api/doctor/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const result = await response.json();

        // ✅ Store the token in localStorage
        localStorage.setItem("doctorToken", result.token);

        // ✅ Show success message or navigate
        alert("Login successful!");
        console.log("JWT Token:", result.token);
        navigate("/dashboard");
    } catch (error) {
        console.error("Submission error:", error.message);
        alert("Login failed: " + error.message);
    }
    setEmail('');
    setPassword('');
};

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src='/Images/doctor.png' alt="Doctors" className="login-illustration" />
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <h2>Welcome Back Doctor!</h2>
          <p className="login-subtext">Let's get you Logged in</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group icon-input">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group icon-input">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <a href="#" className="help-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
