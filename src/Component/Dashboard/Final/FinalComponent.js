
import React, { useEffect, useState } from 'react';
import Sidebar from '../SideBar/sideBar';
import Dashboard from '../Dashboard';
import './Final.css'
import SetAvailability from '../../Schedule/Schedule';
import PrescriptionEditor from '../../Prescription/prescription';
import PrescriptionToggle from '../../Prescription/PrescriptionToggle';
import TodayAppointments from '../../Appointment/ap';
function Final() {
  const [selectedIndex,setSelectedIndex]=useState(0)
    const appointments=[
        {
            patientName: 'John Doe',
            patientAge: 30,
            patientEmail: 'john@example.com',
            patientContact: '1234567890',
            symptoms: 'Headache and fever',
            date: '2025-05-24', // <-- today
            time: '10:00 AM',
            patientImage: '...base64StringHere...',
        },
        {
            patientName: 'Jane Smith',
            patientAge: 28,
            patientEmail: 'jane@example.com',
            patientContact: '9876543210',
            symptoms: 'Cough and cold',
            date: '2025-05-25', // <-- not today
            time: '2:30 PM',
            patientImage: '...base64StringHere...',
        },
    ]

 
  return (
 <div>
     <div className="app-container">
      <Sidebar setSelectedIndex={setSelectedIndex}/>
      {selectedIndex===0 &&<Dashboard/>}
      {selectedIndex===1 &&<TodayAppointments appointments={appointments}/>}
      { selectedIndex===2&&<SetAvailability/>}
      { selectedIndex===3&&<PrescriptionToggle/>}
    </div>
 </div>
  
  );
}

export default Final;
