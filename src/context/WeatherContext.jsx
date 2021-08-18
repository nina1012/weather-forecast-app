import React, { createContext, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [isPreciseLocation, setIsPreciseLocation] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [id, setId] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  const CORS = 'https://api.allorigins.win/raw?url=';
  const WEATHER_API = 'https://www.metaweather.com/api/location/';
  const URL = `${CORS}${WEATHER_API}`;

  const { fetchedData } = useFetch(
    `${URL}${isSearching ? `search/?query=${query || 'london'}` : id}`
  );

  const { data, location, locationsArray } = fetchedData();

  const getPreciseLocation = async () => {
    function success(pos) {
      var crd = pos.coords;
      searchingLocations('lattlng', crd);
    }

    const defaultLocation = () => {
      console.log('default is London');
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setPreciseLocation(false);
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, defaultLocation, options);
      return;
    }
    defaultLocation();
  };

  isPreciseLocation && getPreciseLocation();

  // based on selected unit for temerature, change all temperature for all days
  const allTemperatures = location?.consolidated_weather.map((day) => {
    if (isFahrenheit) {
      const min = (day.min_temp * 9) / 5 + 32;
      const max = (day.max_temp * 9) / 5 + 32;
      const temp = (day.the_temp * 9) / 5 + 32;

      return {
        ...day,
        min_temp: min,
        max_temp: max,
        the_temp: temp,
      };
    }
    return day;
  });

  const providedValues = {
    setIsPreciseLocation,
    setQuery,
    query,
    data,
    isSearching,
    setId,
    setIsSearching,
    setIsFahrenheit,
    fetchedData,
    allTemperatures,
  };

  return <WeatherContext.Provider value={providedValues}>{children}</WeatherContext.Provider>;
};
