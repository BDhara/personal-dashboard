import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import styles from '../styles/UserProfile.module.css';
import profileLogo from '../assets/profile.jpg';
import ToDoList from './ToDoList';
import Weather from './Weather';
import '../styles/util.css'

const Dashboard = ({ name, email }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const navigate = useNavigate();

  const toggleInfoVisibility = () => {
    setInfoVisible(!infoVisible);
  };

  useEffect(() => {
    navigate('/weather');
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
          <div className={styles.popupInfo}>
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
