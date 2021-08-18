import React from 'react';
import './App.css';
import { WeatherProvider } from './context/WeatherContext';
import Test from './components/Test';
import MainContent from './components/MainContent';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        {/* <Test /> */}
        <MainContent />
      </div>
    </WeatherProvider>
  );
}

export default App;
