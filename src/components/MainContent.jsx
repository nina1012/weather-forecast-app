import React, { useContext, useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { WeatherContext } from '../context/WeatherContext';
import TodayPreview from './TodayPreview';
import Spinner from './Spinner';
import { formatValue } from '../utils/formatting';
import { rotateIcon } from '../utils/rotateIcon';
import { ImCompass } from 'react-icons/im';
import DayCard from './DayCard';

const MainContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [size] = useMediaQuery();
  const { location, fetchedData, setIsFahrenheit, isFahrenheit } = useContext(WeatherContext);
  const { isLoading, data } = fetchedData();

  // at each change of location, weather item inside localStorage should be changed and store new location as weather
  useEffect(() => {
    window.localStorage.setItem('weather', JSON.stringify(location));
  }, [location]);

  // extracting weather for today and other days from either data or location (default if data is not known and localStorage is empty)
  let today;
  let otherDays;
  if (data.consolidated_weather || location.consolidated_weather) {
    [today, ...otherDays] = location.consolidated_weather;
  }

  const {
    wind_speed,
    wind_direction_compass: direction,
    visibility,
    humidity,
    air_pressure,
  } = today || location.consolidated_weather[0];

  return (
    <div className="lg:grid lg:grid-cols-1/3 bg-primaryDark">
      <TodayPreview setShowForm={setShowForm} showForm={showForm} />
      {location ? (
        <div className="px-5 py-10 md:pl-28 md:pr-28 2xl:pl-60 2xl:pr-20">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <main className="bg-primaryDark text-white md:px-0 ">
                {size > 1024 ? (
                  <div className="flex justify-end pb-2">
                    <button
                      className={`temperature-btn ${isFahrenheit ? '' : 'invert'}`}
                      onClick={() => setIsFahrenheit(false)}
                    >
                      &deg;C
                    </button>
                    <button
                      className={`temperature-btn ml-2 ${isFahrenheit ? 'invert' : ''}`}
                      onClick={() => setIsFahrenheit(true)}
                    >
                      &deg;F
                    </button>
                  </div>
                ) : null}
                <div className="list-cards grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 py-12 px-4 md:grid-cols-5 md:justify-items-inherit md:gap-x-0 md:px-0 md:py-20 md:pt-16 lg:gap-x-4">
                  {otherDays &&
                    otherDays.map((eachDay) => <DayCard day={eachDay} key={eachDay.id} />)}
                </div>
                <div className="grid justify-center highlights relative z-10">
                  <h2 className="text-2xl text-left font-bold">Today's Hightlights</h2>
                  <div className="grid grid-cols-1 overflow-hidden sm:overflow-visible gap-8 pt-12 pb-20 md:grid-cols-highlight-2 md:pb-12 md:justify-between">
                    <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                      <h3 className="font-medium text-lightGray">Wind status</h3>
                      <p className="my-4">
                        <span className="text-6xl font-semibold">{formatValue(wind_speed)}</span>{' '}
                        <span className="text-3xl">mph</span>
                      </p>
                      <div className="centering">
                        <span
                          className="material-icons centering md-24 p-1 bg-gray-500 rounded-full overflow-hidden mx-2"
                          style={{
                            transform: `rotate(${rotateIcon(direction)})`,
                          }}
                        >
                          <ImCompass />
                        </span>
                        <span className="mx-2">{direction}</span>
                      </div>
                    </div>
                    <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                      <h3 className="font-medium text-lightGray">Humidity</h3>
                      <p className="my-4 mb-6">
                        <span className="text-6xl font-semibold">{humidity}</span>{' '}
                        <span className="text-3xl">%</span>
                      </p>
                      <div className="range relatives bg-gray-300 mx-auto w-3/4 rounded">
                        <div
                          className=" bg-yellow-300"
                          style={{
                            width: `${humidity}%`,
                            height: '5px',
                          }}
                        ></div>
                        <div className="indicator"></div>
                      </div>
                    </div>
                    <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                      <h3 className="font-medium text-lightGray">Visibility</h3>
                      <p className="my-4">
                        <span className="text-6xl font-semibold">{formatValue(visibility)}</span>{' '}
                        <span className="text-3xl">miles</span>
                      </p>
                    </div>
                    <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                      <h3 className="font-medium text-lightGray">Air pressure</h3>
                      <p className="my-4">
                        <span className="text-6xl font-semibold">{formatValue(air_pressure)}</span>{' '}
                        <span className="text-3xl">mb</span>
                      </p>
                    </div>
                  </div>
                </div>
              </main>
              <footer className="bg-primaryDark text-grayLight p-4 md:p-6 flex justify-center items-end">
                <span>
                  created by{' '}
                  <a className="font-semibold underline" href="https://github.com/nina1012">
                    nina1012
                  </a>{' '}
                </span>
                <span> &middot; </span> <span> devchallenges.io</span>
              </footer>
            </>
          )}
        </div>
      ) : (
        <h1 className="text-4xl text-red-700">Nothing to show yet!</h1>
      )}
    </div>
  );
};

export default MainContent;
