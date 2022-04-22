import React from "react";
import { useSelector } from "react-redux";
import { WeatherAppState } from "../../../../redux/weather";
import { fahrenheitToCelsius } from "../../../../services/degress";
import { DailyForecast } from "../../../../types/fiveDaysForecasts";

import "./dailyForecast.css";

interface DailyWeatherProps {
  dailyForecast: DailyForecast;
}

const DailyWeather: React.FC<DailyWeatherProps> = (props) => {
  const temperatureUnit = useSelector(
    (state: WeatherAppState) => state.temperatureUnit
  );

  const minTemperature =
    temperatureUnit === "C"
      ? fahrenheitToCelsius(
          props.dailyForecast.Temperature.Minimum.Value
        ).toFixed(2) + "C"
      : props.dailyForecast.Temperature.Minimum.Value.toFixed(2) + "F";

  const maxTemperature =
    temperatureUnit === "F"
      ? fahrenheitToCelsius(props.dailyForecast.Temperature.Maximum.Value) + "C"
      : props.dailyForecast.Temperature.Maximum.Value + "F";

  return (
    <div className="dailyWeatherContainer">
      <h4>{new Date(props.dailyForecast.Date).toString().slice(0, 10)}</h4>
      <p>
        {minTemperature}-{maxTemperature}
      </p>
    </div>
  );
};

export default DailyWeather;
