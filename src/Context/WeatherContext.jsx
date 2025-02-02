import React, { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "London");
  const [unit, setUnit] = useState("metric"); // "metric" = °C, "imperial" = °F

  // ✅ Function to fetch current weather
  const fetchWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=451db31a922095940b8a5b8b38177ad9`
    );
    return response.data;
  };

  // ✅ Function to fetch 5-day forecast
  const fetchForecast = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=451db31a922095940b8a5b8b38177ad9`
    );
    return response.data;
  };

  // ✅ Fetch current weather
  const { data: weatherData, error, isLoading } = useQuery({
    queryKey: ["weather", city, unit],
    queryFn: fetchWeather,
    staleTime: 30000, // Cache for 30 sec
    refetchInterval: 30000,
  });

  // ✅ Fetch 5-day forecast
  const { data: forecastData, error: forecastError, isLoading: forecastLoading } = useQuery({
    queryKey: ["forecast", city, unit],
    queryFn: fetchForecast,
    staleTime: 30000,
    refetchInterval: 30000,
  });

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        error,
        forecastError,
        isLoading,
        forecastLoading,
        city,
        setCity,
        unit,
        setUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
