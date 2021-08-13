import React, { useContext, useCallback } from 'react';
import { WeatherContext, WeatherProvider } from '../context/WeatherContext';
import { debounce } from '../utils/debounce';

const Test = () => {
  const { setIsPreciseLocation, setQuery } = useContext(WeatherContext);
  const setInput = (e) => {
    setQuery(e.target.value);
  };
  // useCallback makes sure that the same instance of debounced callback(debounde) is called between rerenderings
  const debouncedFunc = useCallback(debounce(setInput, 500), []);

  return (
    <div>
      <button
        onClick={() => {
          console.log('precise');
          setIsPreciseLocation(true);
        }}
      >
        precise
      </button>
      <button
        onClick={() => {
          console.log('non');
          setIsPreciseLocation(false);
        }}
      >
        non precise
      </button>
      <input type="text" onChange={debouncedFunc} />
      <button></button>
    </div>
  );
};

export default Test;
