import React from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <SearchBar />
      <ErrorMessage />
      <WeatherInfo />
    </div>
  );
};

export default App;