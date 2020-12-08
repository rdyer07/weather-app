import React, { useState } from "react";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
};

function App() {
  const dateBuild = d => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(result => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div className="search-container">
          <label>
            Enter City Name:
            <input
              type="text"
              placeholder="Search here"
              className="search-bar"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </label>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

// Weather App Design
// Searchbar to locate cities
// weather data - fetch API
// state: query (searching) & weather (data)

// UI -> 2 containers
// location container - consisting of date and location
// weather container - consisting of temperature and weather description

export default App;
