import React from 'react';
import './App.css';
import { WeatherProvider } from './context/WeatherContext';
import MainContent from './components/MainContent';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <MainContent />
      </div>
    </WeatherProvider>
  );
}

export default App;
