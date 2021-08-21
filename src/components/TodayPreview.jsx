import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import SearchLocation from './SearchLocation';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import Spinner from './Spinner';
import { formatDate, formatValue } from '../utils/formatting';

const TodayPreview = ({ showForm, setShowForm }) => {
  const { fetchedData, isFahrenheit, setIsPreciseLocation, isPreciseLocation } =
    useContext(WeatherContext);

  const { isLoading, data, location } = fetchedData();

  let today;
  if (data.consolidated_weather) {
    today = data.consolidated_weather[0];
  }

  const {
    the_temp: temp,
    weather_state_name: state,
    applicable_date: date,
    weather_state_abbr: img_name,
  } = today || location.consolidated_weather[0];

  return (
    <aside
      style={{
        backgroundImage: !showForm && "url('/assets/Cloud-background.png')",
      }}
      className="py-6 px-5 h-full min-h-screen bg-primaryLight text-white bg-no-repeat bg-top-30 bg-blend-overlay"
    >
      {showForm ? (
        <SearchLocation setShowForm={setShowForm} />
      ) : (
        <div className="min-h-screen h-full">
          <div className="flex justify-between items-center">
            <button className="btn-gray px-4" onClick={() => setShowForm(true)}>
              Search for places
            </button>
            <button
              className="btn-gray rounded-full"
              style={{
                backgroundColor: isPreciseLocation ? 'hsl(234,32%,35%)' : '#6E707A',
              }}
              onClick={() => setIsPreciseLocation((prevState) => (prevState = !prevState))}
            >
              <BiCurrentLocation size={28} />
            </button>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="today-stats grid gap-8 mt-20 text-grayLight md:mt-32">
              <div className="centering">
                <img
                  src={`/assets/${img_name || 'c'}.png`}
                  alt="weather icon"
                  className="w-icon-width-small md:w-icon-width-large"
                />
              </div>
              <h1 className="text-9xl text-white mt-12 font-medium">
                {formatValue(isFahrenheit ? (temp * 9) / 5 + 32 : temp)}
                <span className="text-5xl text-grayLight font-light ">
                  &deg;{isFahrenheit ? 'F' : 'C'}
                </span>
              </h1>
              <h2 className="font-semibold text-4xl leading-10 ">{state}</h2>
              <div className="centering text-lg">
                <span>Today</span>
                <span className="mx-4">&middot;</span>
                <span>{formatDate(date)}</span>
              </div>
              <div className="centering">
                <MdLocationOn size={20} />
                <span className="ml-2 text-lg">{data.title || location.title}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default TodayPreview;
