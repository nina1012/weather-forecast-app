import React, { useContext, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import { WeatherContext } from '../context/WeatherContext';
import Spinner from './Spinner';
import { debounce } from '../utils/debounce';
import LocationItem from './LocationItem';

const SearchLocation = ({ setShowForm }) => {
  const { fetchedData, setQuery, setIsSearching } = useContext(WeatherContext);
  const { isLoading, locationsArray, data, location } = fetchedData();

  console.log(location, data);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearching((prevState) => !prevState);
  };

  const setInput = (e) => {
    setIsSearching(true);
    setQuery(e.target.value);
    console.log(data);
  };
  // useCallback makes sure that the same instance of debounced callback(debounde) is called between rerenderings
  const debouncedFunc = useCallback(debounce(setInput), []);

  return (
    <div className="bg-primaryLight h-screen w-full fixed-position py-6 px-5 lg:w-aside-width">
      <div onClick={() => setShowForm(false)}>
        <MdClose size={26} className="ml-auto" />
      </div>
      <form className="flex justify-between align-center py-4" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="px-4 input w-10/12 mr-3"
          placeholder="&#61442;   search location"
          style={{ fontFamily: 'Raleway, FontAwesome' }}
          onChange={debouncedFunc}
        />
        <button className="btn-gray bg-buttonBlue p-3" onClick={(e) => handleSubmit(e)}>
          Search
        </button>
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="searched-locations mt-6">
          {locationsArray
            ? locationsArray.map((location) => (
                <LocationItem location={location} key={location.woeid} key={location.title} />
              ))
            : null}
        </ul>
      )}
    </div>
  );
};

export default SearchLocation;
