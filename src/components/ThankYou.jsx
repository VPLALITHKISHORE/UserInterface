import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css'; // Import the CSS file for specific styling

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <h1 className="fade-in">Thank You for Your Submission!</h1>
      <p className="fade-in delay-1">Your application has been submitted successfully.</p>
      <p className="fade-in delay-2">We will review it and get back to you shortly.</p>
      <Link to="/" className="back-to-home fade-in delay-3">Back to Home</Link>
    </div>
  );
};

export default ThankYou;
