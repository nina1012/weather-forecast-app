import React, { useContext, useCallback } from 'react';
import { WeatherContext, WeatherProvider } from '../context/WeatherContext';
import { debounce } from '../utils/debounce';

const Test = () => {
  const {
    setIsPreciseLocation,
    setQuery,
    query,
    data,
    setIsSearching,
    isSearching,
    setId,
    setIsFahrenheit,
  } = useContext(WeatherContext);
  const setInput = (e) => {
    setIsSearching(true);
    setQuery(e.target.value);
  };
  console.log(data);
  // useCallback makes sure that the same instance of debounced callback(debounde) is called between rerenderings
  const debouncedFunc = useCallback(debounce(setInput), []);

  const searchForCityWeather = (id) => {
    setIsSearching(false);
    setId(id);
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log('f');
          setIsFahrenheit(true);
        }}
      >
        F
      </button>
      <button
        onClick={() => {
          console.log('c');
          setIsFahrenheit(false);
        }}
      >
        C
      </button>
      <input type="text" onChange={debouncedFunc} />
      <ul>
        {Array.isArray(data) &&
          data.map((item) => (
            <li className="" onClick={() => searchForCityWeather(item.woeid)} key={item.title}>
              {item.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Test;
