import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import SearchLocation from './SearchLocation';
import { BiCurrentLocation } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import Spinner from './Spinner';

const TodayPreview = ({ showForm, setShowForm }) => {
  const { fetchedData } = useContext(WeatherContext);

  const { isLoading, data } = fetchedData();
  console.log(data);
  return (
    <aside
      style={{
        backgroundImage: !showForm && "url('./src/assets/Cloud-background.png')",
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
                backgroundColor: true ? 'hsl(234,32%,35%)' : '#6E707A',
              }}
              // onClick={() =>
              //   setPreciseLocation(prevState => (prevState = !prevState))
              // }
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
                  src={`./src/assets/${'c'}.png`}
                  alt="weather icon"
                  className="w-icon-width-small md:w-icon-width-large"
                />
              </div>
              <h1 className="text-9xl text-white mt-12 font-medium">
                {Math.floor(12.43545)}
                <span className="text-5xl text-grayLight font-light ">&deg;C</span>
              </h1>
              <h2 className="font-semibold text-4xl leading-10 ">{'shower'}</h2>
              <div className="centering text-lg">
                <span>Today</span>
                <span className="mx-4">&middot;</span>
                <span>{14.7}</span>
              </div>
              <div className="centering">
                <MdLocationOn size={20} />
                <span className="ml-2 text-lg">{'London'}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default TodayPreview;
