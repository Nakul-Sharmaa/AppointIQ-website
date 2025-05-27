import React, { useState } from 'react';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';
import PatientDetails from '../UserDetails';

const cards = [
  { title: 'Total New Appointment', count: 2, image:"/Images/add-folder.png" },
  { title: 'Total Approved', count: 1, image:"/Images/check-mark.png" },
  { title: 'Cancelled Appointment', count: 0, image:"/Images/declined.png" },
  { title: 'Total Appointment', count: 3,image:"/Images/folder.png"  },
];

export default function DashboardCards() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
const handleBack = () => {
    setSelectedIndex(null); // Go back to cards
  };
  return (
    <div className="dashboard-cards">
      {selectedIndex === null ? (
        cards.map((card, index) => (
         <div key={index} className='outer' onClick={() => setSelectedIndex(index)}>
  <div className='detail'>
    <div className={`card ${card.color}`}>
      <div className="card-content">
        <div className="card-text">
          <p className="count">{card.count}</p>
          <p className="title">{card.title}</p>
        </div>
        <img src={card.image} alt="icon" className="card-icon" />

      </div>
      <div className="bottom"></div>
    </div>
  </div>
</div>


        ))
      ) : (
        <PatientDetails onBack={handleBack} selectedindex={selectedIndex}/>
      )}
    </div>
  );
}
