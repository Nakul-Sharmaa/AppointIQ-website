import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="header">
      <button className="back-btn">←</button>
      <h3>Dashboard</h3>
      <div className="header-icons">
        <span>🔔</span>
        <span>⚙️</span>
      </div>
    </div>
  );
}
