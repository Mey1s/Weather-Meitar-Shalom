import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { accuWeatherApiKey } from "../../../consts";
import { WeatherAppState } from "../../../redux/weather";
import { fetchApiGet } from "../../../services/api";
import { fahrenheitToCelsius } from "../../../services/degress";
import { CurrentWeatherCondition } from "../../../types/currentWeatherCondition";

import "./currentWeather.css";

interface CurrentWeatherProps {
  cityLocationKey: string;
  cityName: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = (props) => {
  const [currentWeatherCondition, setCurrentWeatherCondition] =
    useState<CurrentWeatherCondition>({
      LocalObservationDateTime: new Date(),
      EpochTime: 1650636780,
      WeatherText: "Cloudy",
      WeatherIcon: 7,
      HasPrecipitation: false,
      PrecipitationType: null,
      IsDayTime: true,
      Temperature: {
        Metric: {
          Value: 20.6,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 69,
          Unit: "F",
          UnitType: 18,
        },
      },
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    });
  const temperatureUnit = useSelector(
    (state: WeatherAppState) => state.temperatureUnit
  );

  const temperatore =
    temperatureUnit === "C"
      ? currentWeatherCondition.Temperature.Metric.Value
      : currentWeatherCondition.Temperature.Imperial.Value;

  useEffect(() => {
    getCurrentWeatherCondition();
  }, [props.cityLocationKey]);

  const getCurrentWeatherCondition = async () => {
    // const newCurrentWeatherCondition: CurrentWeatherCondition[] =
    //   await fetchApiGet(
    //     `http://dataservice.accuweather.com/currentconditions/v1/${props.cityLocationKey}?apiKey=${accuWeatherApiKey}`
    //   );
    const newCurrentWeatherCondition: CurrentWeatherCondition[] =
      await fetchApiGet(
        "http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=zMNPiORpciVYF0n5Z12HKGjPIPsxnW9W"
      );
    setCurrentWeatherCondition(newCurrentWeatherCondition[0]);
  };

  const addCityToLocalStorage = () => {
    const currentFavorites = JSON.parse(
      String(localStorage.getItem("favorites"))
    );

    if (!currentFavorites) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([
          {
            ...currentWeatherCondition,
            LocalizedName: props.cityName,
            Key: props.cityLocationKey,
          },
        ])
      );
    } else {
      currentFavorites.map((city: any) => {
        if (city.Key === props.cityLocationKey) {
          return alert(`You have already added ${props.cityName}`);
        }
      });

      localStorage.setItem(
        "favorites",
        JSON.stringify([
          ...currentFavorites,
          ,
          {
            ...currentWeatherCondition,
            LocalizedName: props.cityName,
            Key: props.cityLocationKey,
          },
        ])
      );
    }
  };

  return (
    <div className="homeMainColumn">
      <div className="homeTopButtonsRow">
        <div className="homeTopButtonsLeft">
          <i role="button" className="fa fa-times" aria-hidden="true"></i>
          <div className="homeDetails">
            <h4 className="homeDetailsHeader">{props.cityName}</h4>
            <p className="homeDetailsCelsius">{temperatore}</p>
          </div>
        </div>
        <button className="homeAddButton">
          <i
            className="fa fa-heart-o"
            aria-hidden="true"
            onClick={addCityToLocalStorage}
          ></i>
          Add to favorites
        </button>
      </div>
    </div>
  );
};

export default CurrentWeather;
