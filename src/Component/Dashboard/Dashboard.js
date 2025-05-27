import React from 'react';
import DashboardCards from './DashboardCards/Dashboradcards';
import Header from './Header/Header';
export default function Dashboard() {
  return (
    <div style={{ flex: 1, background: '#f1f2f6' }}>
      <DashboardCards />
    </div>
  );
}
