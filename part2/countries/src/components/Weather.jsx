/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Weather = ({ latlng }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const [lat, lon] = latlng;
    weatherService
      .getWeather(lat, lon)
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error("Failed to fetch weather:", error);
      });
  }, [latlng]);

  return (
    <>
      {weather ? (
        <div>
          <p>Temp: {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Weather;
