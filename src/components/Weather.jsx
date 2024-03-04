import React, { useState } from "react";
import styles from '../styles/Weather.module.css';


const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const searchPressed = () => {
    setError(""); 

    if (!search.trim()) {
      setError("Please enter a city/town.");
      setWeather({}); 
      return;
    }

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        setError(`Failed to fetch weather data. ${error.message}`);
        setWeather({});
      });
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weather App</h1>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Enter city/town..."
            aria-label="weather-search"
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
            value={search}
          />
          <button onClick={searchPressed} className={styles.button}>
            Search
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {typeof weather.main !== "undefined" && (
          <div className={styles.weatherInfo}>
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>            
          </div>
        )}
      </header>
    </div>
  );
}

export default Weather;
