import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { formatDate, formatValue } from '../utils/formatting';

const DayCard = ({ day }) => {
  const { applicable_date: date, weather_state_abbr: abbr, max_temp: max, min_temp: min } = day;

  const { isFahrenheit } = useContext(WeatherContext);
  return (
    <div className="bg-primaryLight w-dayCardWidth h-dayCardHeight border-white flex flex-col justify-evenly">
      <p>{formatDate(date)}</p>
      <img
        src={`/assets/${abbr}.png`}
        className="centering w-dayCardImgWidth h-dayCardImgHeight mx-auto object-contain"
      />
      <div className="flex justify-evenly">
        <span>
          {formatValue(isFahrenheit ? (max * 9) / 5 + 32 : max)}&deg;{isFahrenheit ? 'F' : 'C'}
        </span>
        <span className="text-grayLight">
          {formatValue(isFahrenheit ? (min * 9) / 5 + 32 : min)}&deg;{isFahrenheit ? 'F' : 'C'}
        </span>
      </div>
    </div>
  );
};

export default DayCard;
