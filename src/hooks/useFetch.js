import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(
    JSON.parse(window.localStorage.getItem('weather')) || {
      consolidated_weather: [
        {
          id: 6342637364707328,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          wind_direction_compass: 'WSW',
          created: '2021-08-20T18:56:01.384684Z',
          applicable_date: '2021-08-20',
          min_temp: 14.125,
          max_temp: 22.825000000000003,
          the_temp: 21.89,
          wind_speed: 4.534437993777671,
          wind_direction: 238.15641455725407,
          air_pressure: 1016.5,
          humidity: 68,
          visibility: 9.798713015986639,
          predictability: 71,
        },
        {
          id: 5951972105519104,
          weather_state_name: 'Heavy Rain',
          weather_state_abbr: 'hr',
          wind_direction_compass: 'SSW',
          created: '2021-08-20T18:56:01.755540Z',
          applicable_date: '2021-08-21',
          min_temp: 15.5,
          max_temp: 20.990000000000002,
          the_temp: 19.994999999999997,
          wind_speed: 4.335421926063787,
          wind_direction: 204.4908728470411,
          air_pressure: 1015.0,
          humidity: 80,
          visibility: 6.754615545215939,
          predictability: 77,
        },
        {
          id: 5056344991203328,
          weather_state_name: 'Light Rain',
          weather_state_abbr: 'lr',
          wind_direction_compass: 'NW',
          created: '2021-08-20T18:56:01.948177Z',
          applicable_date: '2021-08-22',
          min_temp: 14.22,
          max_temp: 20.675,
          the_temp: 20.355,
          wind_speed: 6.443262806439726,
          wind_direction: 313.5455289334719,
          air_pressure: 1018.0,
          humidity: 73,
          visibility: 11.225381273363556,
          predictability: 75,
        },
        {
          id: 6429181224157184,
          weather_state_name: 'Light Cloud',
          weather_state_abbr: 'lc',
          wind_direction_compass: 'NNE',
          created: '2021-08-20T18:56:01.867525Z',
          applicable_date: '2021-08-23',
          min_temp: 14.19,
          max_temp: 23.255,
          the_temp: 22.200000000000003,
          wind_speed: 6.517595651941992,
          wind_direction: 20.834630213257075,
          air_pressure: 1026.5,
          humidity: 60,
          visibility: 12.946268790264853,
          predictability: 70,
        },
        {
          id: 4782492977463296,
          weather_state_name: 'Clear',
          weather_state_abbr: 'c',
          wind_direction_compass: 'ENE',
          created: '2021-08-20T18:56:01.275360Z',
          applicable_date: '2021-08-24',
          min_temp: 13.67,
          max_temp: 22.415,
          the_temp: 22.425,
          wind_speed: 8.35972033419762,
          wind_direction: 67.83195451454367,
          air_pressure: 1029.0,
          humidity: 49,
          visibility: 14.674302075876879,
          predictability: 68,
        },
        {
          id: 6099673078038528,
          weather_state_name: 'Heavy Cloud',
          weather_state_abbr: 'hc',
          wind_direction_compass: 'NE',
          created: '2021-08-20T18:56:04.440141Z',
          applicable_date: '2021-08-25',
          min_temp: 12.8,
          max_temp: 22.560000000000002,
          the_temp: 22.35,
          wind_speed: 4.744694185954028,
          wind_direction: 51.5,
          air_pressure: 1026.0,
          humidity: 56,
          visibility: 9.999726596675416,
          predictability: 71,
        },
      ],
      time: '2021-08-20T21:29:54.547826+01:00',
      sun_rise: '2021-08-20T05:54:09.727325+01:00',
      sun_set: '2021-08-20T20:12:26.514882+01:00',
      timezone_name: 'LMT',
      parent: {
        title: 'England',
        location_type: 'Region / State / Province',
        woeid: 24554868,
        latt_long: '52.883560,-1.974060',
      },
      sources: [
        { title: 'BBC', slug: 'bbc', url: 'http://www.bbc.co.uk/weather/', crawl_rate: 360 },
        { title: 'Forecast.io', slug: 'forecast-io', url: 'http://forecast.io/', crawl_rate: 480 },
        {
          title: 'HAMweather',
          slug: 'hamweather',
          url: 'http://www.hamweather.com/',
          crawl_rate: 360,
        },
        {
          title: 'Met Office',
          slug: 'met-office',
          url: 'http://www.metoffice.gov.uk/',
          crawl_rate: 180,
        },
        {
          title: 'OpenWeatherMap',
          slug: 'openweathermap',
          url: 'http://openweathermap.org/',
          crawl_rate: 360,
        },
        {
          title: 'Weather Underground',
          slug: 'wunderground',
          url: 'https://www.wunderground.com/?apiref=fc30dc3cd224e19b',
          crawl_rate: 720,
        },
        {
          title: 'World Weather Online',
          slug: 'world-weather-online',
          url: 'http://www.worldweatheronline.com/',
          crawl_rate: 360,
        },
      ],
      title: 'London',
      location_type: 'City',
      woeid: 44418,
      latt_long: '51.506321,-0.12714',
      timezone: 'Europe/London',
    }
  );
  const [locationsArray, setLocationsArray] = useState(null);

  useEffect(() => {
    async function fetching() {
      try {
        // if url is undefined, reset all the data and url to userLocationInfo and throw an error
        if (url) {
          setIsLoading(true);
          const response = await fetch(url, { mode: 'cors' });
          const data = await response.json();
          // setData(data);
          if (Array.isArray(data)) {
            setLocationsArray(data);
          } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            setLocation(data);
          }
          setData(data);
          setIsLoading(false);
          return { setData, setLocationsArray, setIsLoading };
        } else {
          reset();
          throw new TypeError('Invalid input value');
        }
      } catch (error) {
        setError(error);
      }
    }
    fetching();
  }, [url]);

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  const fetchedData = () => {
    return { data, isLoading, error, location, locationsArray };
  };

  return { fetchedData, reset };
};

export default useFetch;
