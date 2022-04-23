import React, { useEffect, useState } from "react";
import { fiveDaysForecastsInitial } from "../../../consts";
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

const FiveDaysWeather: React.FC<FiveDaysWeatherProps> = (props) => {
  const [fiveDaysForecasts, setFiveDaysForecasts] = useState<FiveDaysForecasts>(
    fiveDaysForecastsInitial
  );

  useEffect(() => {
    getNewFiveDaysForecasts();
  }, [props.cityLocationKey]);

  const getNewFiveDaysForecasts = async () => {
    getFiveDaysForecasts(props.cityLocationKey).then((newFiveDaysForecasts) => {
      setFiveDaysForecasts(newFiveDaysForecasts);
    });
  };

  return (
    <div className="fiveDaysWeatherContainer">
      <h1 className="homeMainHeader">Five Days Forecasts</h1>
      <div className="homeDaysWeatherRow">
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
