import React, { useState } from 'react';
import './App.css';
const api = {
  key:"af7697001a24d0e57c46194192721220",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <header>
        <input type="text" autocomplete="off" placeholder="Search for a city..." className="search-box" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </header>
      {(typeof weather.main != "undefined") ? (
      <div className="main-container">
        <section className="location">
          <div className="city">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </section>
        <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}
            </div>
        </div>
        </div>
        ):('')}
      </main>
      </div>
         );
       }
       export default App;
