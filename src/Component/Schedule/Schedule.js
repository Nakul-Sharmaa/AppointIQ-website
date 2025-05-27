import React, { useState } from 'react';
import "./Schedule.css"

export default function SetAvailability() {
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Availability set for ${day} at ${time}`);
    // Here, POST to backend to save the schedule
  };

  return (
    <div className="set-availability">
      <h2>Set Your Availability</h2>
      <div className='formava'>
        <form onSubmit={handleSubmit}>
        <label>
          Day:
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            {/* Add rest of the days */}
          </select>
        </label>
        <label>
          Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <button type="submit">Save Availability</button>
      </form>
      </div>
    </div>
  );
}
