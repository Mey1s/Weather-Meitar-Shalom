import { useSelector } from "react-redux";
import { celciusSign, fahrenheitSign } from "../../../../consts";
import { WeatherAppState } from "../../../../redux/weather";
import { fahrenheitToCelsius } from "../../../../services/degress";
import { DailyForecast } from "../../../../types/fiveDaysForecasts";
import "./dailyForecast.scss";

interface DailyWeatherProps {
  dailyForecast: DailyForecast;
}

const DailyWeather = ({dailyForecast}: DailyWeatherProps) => {
  const temperatureUnit = useSelector(
    (state: WeatherAppState) => state.temperatureUnit
  );

  //calculate min temperature
  const minTemperature =
    temperatureUnit === celciusSign
      ? `${fahrenheitToCelsius(
        dailyForecast.Temperature.Minimum.Value
      ).toFixed(0)}${celciusSign}`
      : `${dailyForecast.Temperature.Minimum.Value.toFixed(0)}${fahrenheitSign}`;

  //calculate max temperature
  const maxTemperature =
    temperatureUnit === celciusSign
      ? `${fahrenheitToCelsius(
        dailyForecast.Temperature.Maximum.Value
      ).toFixed(0)}${celciusSign}`
      : `${dailyForecast.Temperature.Maximum.Value.toFixed(0)}${fahrenheitSign}`;

  return (
    <div className="dailyWeatherContainer">
      <h4>{new Date(dailyForecast.Date).toString().slice(0, 10)}</h4>
      <p>
        {minTemperature}&deg; / {maxTemperature}&deg;
      </p>
    </div>
  );
};

export default DailyWeather;
