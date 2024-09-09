import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Adjust import as needed
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Certificate Application</h1>
        <nav className="nav">
          <ul className="nav-links">
            {user ? (
              <>
                <li>
                  <Link to="/form" className="nav-link">Apply for Certificate</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-button">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
