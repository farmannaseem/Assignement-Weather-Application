import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { format } from "date-fns"; // Import date-fns to format the time

const WeatherInfo = () => {
  const { forecastData, error, isLoading, unit, setUnit } = useContext(
    WeatherContext
  );

  if (isLoading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!forecastData?.list) return null; // Ensure that forecast data is available

  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="weather-info">
      <h2>{forecastData.city.name}</h2>

      {/* Weather data for the next 5 days */}
      <div className="forecast">
        {dailyForecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const day = date.toLocaleDateString();
          const time = format(date, "hh:mm a"); // Format time

          // Check if scattered clouds icon should be used
          const isScatteredClouds = forecast.weather[0].main === "Clouds" && forecast.weather[0].description.includes("scattered clouds");

          return (
            <div key={index} className="forecast-day">
              <h3>{day}</h3>
              <p>{time}</p> {/* Display the time */}

              {/* Conditionally render the scattered clouds image */}
              <img
                src={
                  isScatteredClouds
                    ? "https://openweathermap.org/img/wn/03d.png" // Scattered clouds icon
                    : `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
                }
                alt={forecast.weather[0].description}
              />
              <p>
                Temperature: {forecast.main.temp} {unitSymbol}
              </p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Conditions: {forecast.weather[0].description}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
      >
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>
    </div>
  );
};

export default WeatherInfo;

