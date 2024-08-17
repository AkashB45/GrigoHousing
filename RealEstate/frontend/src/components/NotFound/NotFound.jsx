// src/components/NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // Optional: for custom styles

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="paddings flexColCenter not-found-container" >
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={handleHomeClick} className=" button home-button">Go to Home</button>
    </div>
  );
};

export default NotFound;
