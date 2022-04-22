import React from "react";
import { DailyForecast } from "../../../../types/fiveDaysForecasts";

import "./dailyForecast.css";

interface DailyWeatherProps {
  dailyForecast: DailyForecast;
}

const DailyWeather: React.FC<DailyWeatherProps> = (props) => {
  return (
    <div className="DailyWeatherContainer">
      <h4>{props.dailyForecast.Date.toString()}</h4>
      <p>
        {props.dailyForecast.Temperature.Minimum.Value}-
        {props.dailyForecast.Temperature.Maximum.Value}
      </p>
    </div>
  );
};

export default DailyWeather;
