import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ThankYou from './components/ThankYou';
import './App.css'; // Import the CSS file

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />  {/* Show login page on initial load */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<RegistrationForm />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;
