import React from 'react';
import './App.css';
import { WeatherProvider } from './context/WeatherContext';
import Test from './components/Test';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <Test />
      </div>
    </WeatherProvider>
  );
}

export default App;
