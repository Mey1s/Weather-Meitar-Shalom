import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fiveDaysForecastsInitial } from "../../../consts";
import { WeatherAppState } from "../../../redux/weather";
import { getFiveDaysForecasts } from "../../../services/api";
import {
  DailyForecast,
  FiveDaysForecasts,
} from "../../../types/fiveDaysForecasts";
import DailyWeather from "./dailyForecast/dailyForecast";
import "./fiveDaysWeather.scss";

interface FiveDaysWeatherProps {
  cityLocationKey: string;
}

const FiveDaysWeather = ({ cityLocationKey }: FiveDaysWeatherProps) => {
  const [fiveDaysForecasts, setFiveDaysForecasts] = useState<FiveDaysForecasts>(
    fiveDaysForecastsInitial
  );

  const { selectedCityKey, selectedCityName } = useSelector(
    (state: WeatherAppState) => state
  );

  useEffect(() => {
    getNewFiveDaysForecasts();
  }, [cityLocationKey, selectedCityKey, selectedCityName]);

  //get five dats forecasts
  const getNewFiveDaysForecasts = async () => {
    getFiveDaysForecasts(cityLocationKey).then((newFiveDaysForecasts) => {
      setFiveDaysForecasts(newFiveDaysForecasts);
    });
  };

  return (
    <div className="fiveDaysWeatherContainer">
      <h1 className="homeMainHeader">Five Days Forecasts</h1>
      <div className="homeDaysWeatherRow">
        {/* create all daily forecasts */}
        {fiveDaysForecasts.DailyForecasts.map(
          (dailyForecast: DailyForecast, i: number) => {
            return <DailyWeather key={i} dailyForecast={dailyForecast} />;
          }
        )}
      </div>
    </div>
  );
};

export default FiveDaysWeather;
