import React, { useState } from 'react';
import './index.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/doctor/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              fullName: fullName,
              email: email,
              username: username,
              password: password
          })
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Server error: ${response.status}`);
      }
      
      const result = await response.json();
      alert("Registration successful!");
      console.log("User registered:", result);
      
      // Optionally, clear form fields
      setFullName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setRepeatPassword('');
      
    } catch (error) {
      console.error("Registration error:", error.message);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="gradient-overlay"></div>
        <img
          src="/Images/drimageee.jpg"
          alt="signup"
          className="signup-image"
        />
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
          <input 
            type="email" 
            placeholder="Email address..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Repeat Password" 
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required 
          />
          <div className="terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <span>Terms of Use</span>
            </label>
          </div>
          <button type="submit" className="btn-signup">Sign Up</button>
          <p className="signin-link">Sign in →</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
