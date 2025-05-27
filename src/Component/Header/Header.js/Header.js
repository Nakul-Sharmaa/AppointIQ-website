import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // default: go back in history
    }
  };

  return (
    <header className="header-container">
      <button className="back-button" onClick={handleBack}>
        ←
      </button>
      <h1 className="header-title">{title}</h1>
    </header>
  );
}
