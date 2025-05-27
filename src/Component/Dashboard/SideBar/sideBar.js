import React from 'react';
import './Sidebar.css';
 const sideBarItems=["📊 Dashboard","📅 Appointment","🕒 Availability","🏥 Prescription"]
export default function Sidebar( {setSelectedIndex}) {
  return (
    <div className="sidebar">
      <h2 className="logo">DAMS</h2>
      <div className="profile-icon">👤</div>
      <ul className='profile-ul'>
     {sideBarItems.map((item, index) => (
          <li key={index} onClick={() => setSelectedIndex(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
