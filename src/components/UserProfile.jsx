import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import styles from '../styles/UserProfile.module.css';
import profileLogo from '../assets/profile.jpg';
import ToDoList from './ToDoList';
import Weather from './Weather';
import '../styles/util.css';

const Dashboard = ({ name, email }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const toggleInfoVisibility = () => {
    setInfoVisible(!infoVisible);
  };

  const closePopup = (e) => {
    // Close the popup if clicked outside of the popup area
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setInfoVisible(false);
    }
  };

  const handleEscKey = (e) => {
    // Close the popup if the Esc key is pressed
    if (e.key === 'Escape') {
      setInfoVisible(false);
    }
  };

  useEffect(() => {
    navigate('/weather');
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', closePopup);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', closePopup);
    };
  }, []);

  return (
    <div>
      <nav className={styles.userProfile}>
        <div className={styles.dashboard}>
          <p>Dashboard</p>
        </div>
        <div className={styles.navigation}>
          <NavLink to="/weather" className={styles.navItem} activeClassName={styles.activeItem}>
            Weather
          </NavLink>
          <NavLink to="/todo" className={styles.navItem} activeClassName={styles.activeItem}>
            Todo
          </NavLink>
        </div>
        <img
          className={styles.profilePicture}
          src={profileLogo}
          alt="Profile"
          onClick={toggleInfoVisibility}
        />
        {infoVisible && (
          <div ref={popupRef} className={styles.popupInfo}>
            <p>Welcome, {name}</p>
            <p>{email}</p>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/todo" element={<ToDoList />} />
      </Routes>
    </div>
  );
};

const UserProfile = ({ name, email }) => {
  return (
    <BrowserRouter>
      <Dashboard name={name} email={email} />
    </BrowserRouter>
  );
};

export default UserProfile;
