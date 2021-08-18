import React, { useContext, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { WeatherContext } from '../context/WeatherContext';
import TodayPreview from './TodayPreview';
import Spinner from './Spinner';

const MainContent = () => {
  const [showForm, setShowForm] = useState(true);
  const [size] = useMediaQuery();
  const { location, locationsFound, fetchedData, today, otherDays, setIsFahrenheit } =
    useContext(WeatherContext);
  const { isLoading } = fetchedData();

  return (
    <div className="lg:grid lg:grid-cols-1/3 bg-primaryDark">
      <TodayPreview setShowForm={setShowForm} showForm={showForm} />
      <div className="px-5 py-10 md:pl-28 md:pr-28 2xl:pl-60 2xl:pr-20">
        {isLoading ? (
          <Spinner />
        ) : (
          <main className="bg-primaryDark text-white md:px-0 ">
            {size > 1024 ? (
              <div className="flex justify-end pb-2">
                <button className="temperature-btn" onClick={() => setIsFahrenheit(false)}>
                  &deg;C
                </button>
                <button
                  className="temperature-btn ml-2 invert"
                  onClick={() => setIsFahrenheit(true)}
                >
                  &deg;F
                </button>
              </div>
            ) : null}
            <div className="list-cards grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 py-12 px-4 md:grid-cols-5 md:justify-items-inherit md:gap-x-0 md:px-0 md:py-20 md:pt-16 lg:gap-x-4">
              {otherDays?.map((day, i) => (
                <DayCard day={day} key={day.id} />
              ))}
            </div>
            <div className="grid justify-center highlights">
              <h2 className="text-2xl text-left font-bold">Today's Hightlights</h2>
              <div className="grid grid-cols-1 overflow-hidden sm:overflow-visible gap-8 pt-12 pb-20 md:grid-cols-highlight-2 md:pb-12 md:justify-between">
                <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                  <h3 className="font-medium text-lightGray">Wind status</h3>
                  <p className="my-4">
                    <span className="text-6xl font-semibold">2.2</span>{' '}
                    <span className="text-3xl">mph</span>
                  </p>
                  <div className="centering">
                    <span
                      className="material-icons md-24 p-1 bg-gray-500 rounded-full overflow-hidden mx-2"
                      //   style={{
                      //     transform: `rotate(${rotateIcon(wind_direction_compass)})`,
                      //   }}
                    >
                      near_me
                    </span>
                    <span className="mx-2">WSW</span>
                  </div>
                </div>
                <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                  <h3 className="font-medium text-lightGray">Humidity</h3>
                  <p className="my-4">
                    <span className="text-6xl font-semibold">{67}</span>{' '}
                    <span className="text-3xl">%</span>
                  </p>
                  <div className="overflow-hidden range bg-gray-300 mx-auto w-3/4 rounded">
                    <div
                      className=" bg-yellow-300"
                      style={{
                        width: `${67}%`,
                        height: '5px',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                  <h3 className="font-medium text-lightGray">Visibility</h3>
                  <p className="my-4">
                    <span className="text-6xl font-semibold">1.2</span>{' '}
                    <span className="text-3xl">miles</span>
                  </p>
                </div>
                <div className="bg-primaryLight w-highlightCardWidth  md:w-highlightCardWidth pt-4 pb-8">
                  <h3 className="font-medium text-lightGray">Air pressure</h3>
                  <p className="my-4">
                    <span className="text-6xl font-semibold">1232</span>{' '}
                    <span className="text-3xl">mb</span>
                  </p>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default MainContent;
