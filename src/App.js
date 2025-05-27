import './App.css';
import Navbar from './Component/Navbar';
import WelcomeScreen from './Component/Welcome/welcome';
import Footer from './Component/Footer';
import Login from './Component/Login/Login';
import Final from './Component/Dashboard/Final/FinalComponent';
import PatientDetails from './Component/Dashboard/UserDetails'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='Navbar'>
          <Navbar />
        </div>
        
        <div className='Signup'>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Final/>}/>
            <Route path="/patient" element={<PatientDetails/>}/>
          </Routes>
        </div>
        
        <div className='Footer'>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
