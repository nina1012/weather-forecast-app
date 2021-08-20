import React, { useContext, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import { WeatherContext } from '../context/WeatherContext';
import Spinner from './Spinner';
import { debounce } from '../utils/debounce';
import LocationItem from './LocationItem';

const SearchLocation = ({ setShowForm }) => {
  const { fetchedData, setQuery, setIsSearching } = useContext(WeatherContext);
  const { isLoading, locationsArray, data, location } = fetchedData();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearching((prevState) => !prevState);
  };

  const setInput = (e) => {
    setIsSearching(true);
    setQuery(e.target.value);
  };
  // useCallback makes sure that the same instance of debounced callback(debounde) is called between rerenderings
  const debouncedFunc = useCallback(debounce(setInput), []);

  return (
    <div className="bg-primaryLight h-screen w-full fixed-position z-50 py-6 px-5 lg:w-aside-width">
      <div onClick={() => setShowForm(false)}>
        <MdClose size={26} className="ml-auto" />
      </div>
      <form className="flex justify-between align-center py-4" onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          className="px-4 input w-10/12 mr-3"
          placeholder="&#61442;   search location"
          style={{ fontFamily: 'Raleway, FontAwesome' }}
          onChange={debouncedFunc}
        />
        <button className="btn-gray bg-buttonBlue p-3" onClick={handleSubmit}>
          Search
        </button>
      </form>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="searched-locations mt-6 ">
          {locationsArray && locationsArray.length > 1 ? (
            locationsArray.map((location) => (
              <LocationItem
                location={location}
                key={location.woeid}
                key={location.title}
                setShowForm={setShowForm}
              />
            ))
          ) : (
            <h3>No city found</h3>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchLocation;
