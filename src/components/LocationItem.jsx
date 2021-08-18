import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { RiArrowRightSLine } from 'react-icons/ri';

const LocationItem = ({ location }) => {
  const { setIsSearching, setId } = useContext(WeatherContext);
  const searchForCityWeather = (id) => {
    setIsSearching(false);
    setId(id);
  };

  return (
    <li
      className="mb-4 py-2 text-brownDark border-transparent border hover:border-borderLight"
      onClick={() => searchForCityWeather(location.woeid)}
    >
      <button className="location-item p-4 flex items-center justify-between w-full ">
        <span className="font-medium text-lightGray">{location.title}</span>
        <RiArrowRightSLine />
      </button>
    </li>
  );
};

export default LocationItem;
