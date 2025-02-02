import React, { useContext } from 'react';
import WeatherContext from '../context/WeatherContext';

const ErrorMessage = () => {
  const { error } = useContext(WeatherContext);

  if (!error) return null;

  return (
    <div style={{ color: 'red' }}>
      <p>Error: {error}</p>
    </div>
  );
};

export default ErrorMessage;