// Note: Weather App Clone...!

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {

  // Note: Handeling states here...!
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  // Note: Function to check weather by city name...!
  const searchWeather = async (e) => {
    // console.log(e);

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${search.toLowerCase()}&units=metric&appid=4fcd41771cc91187db1651ddcc10916f`;

    if (e.key === "Enter") {
      try {
        // let response = await axios.get(api);
        let response = await axios({
          method: "GET",
          url: api,
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);   // Note: API integrated successfully...!
        let requiredData = response.data;
        setWeather(requiredData);
        setSearch("");
      }

      catch (error) {
        console.log(error.response);
        setWeather(error.response);
      }
    }
  }

  return (
    // Main container...!
    <React.Fragment>

      {/* App container */}
      <div className={
        (typeof weather.main != "undefined")
          ?
          (
            (weather.main.temp > 16)
              ?
              ("app warm")
              :
              ("app")
          )
          :
          ("app")
      }>

        {/* Form container */}
        <div className="form-container">
          <input
            type="text"
            autoFocus
            placeholder="Search City..."
            className="input-field"
            value={search.toLowerCase()}
            onChange={(event) => { setSearch(event.target.value) }}
            onKeyPress={searchWeather}
          />
        </div>

        {/* Weather information container */}
        {
          (typeof weather.main != "undefined")
            ?
            (
              <div className="info-container">

                {/* City name */}
                <h2 className="city-name"> {weather.name}, {weather.sys.country} </h2>

                {/* Current date */}
                <h6> {new Date().toDateString()} </h6>

                {/* Temperature in degree Celsius */}
                <div className="temperature"> {weather.main.temp} &#8451; </div>

                {/* Weather status */}
                <h3 className="weather-status"> {weather.weather[0].main} </h3>
              </div>
            )
            :
            (<h1 className="not-found"> { (weather.data) ? (weather.data.message) : ('Weather App!') } </h1>)
        }
      </div>

    </React.Fragment>
  );
}

export default App;