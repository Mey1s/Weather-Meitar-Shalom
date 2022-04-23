import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WeatherAppState } from "../../../redux/weather";
import { getCurrentCityWeather } from "../../../services/api";
import {
  CurrentWeatherCondition,
  CurrentWeatherConditionExtanded,
} from "../../../types/currentWeatherCondition";

import "./currentWeather.scss";

interface CurrentWeatherProps {
  cityLocationKey: string;
  cityName: string;
  isInFavorites: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = (
  props: CurrentWeatherProps
) => {
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
      ? currentWeatherCondition.Temperature.Metric.Value.toFixed(2) + "C"
      : currentWeatherCondition.Temperature.Imperial.Value.toFixed(2) + "F";

  useEffect(() => {
    console.log(props.isInFavorites);
  }, [props.isInFavorites]);
  useEffect(() => {
    getNewCurrentWeatherCondition();
  }, [props.cityLocationKey]);

  const getNewCurrentWeatherCondition = async () => {
    getCurrentCityWeather(props.cityLocationKey).then(
      (newCurrentWeatherCondition) => {
        setCurrentWeatherCondition(newCurrentWeatherCondition);
      }
    );
  };

  const removeCityFromLocalStorage = () => {
    const currentFavorites = JSON.parse(
      String(localStorage.getItem("favorites"))
    );
    if (currentFavorites) {
      const newCurrentWeatherCondition = currentFavorites.filter(
        (favorite: CurrentWeatherConditionExtanded) =>
          favorite.Key !== props.cityLocationKey
      );
      localStorage.setItem("favorites", newCurrentWeatherCondition);
    }
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
      currentFavorites.map((city: CurrentWeatherConditionExtanded) => {
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
          {props.isInFavorites && (
            <i
              role="button"
              className="fa fa-times"
              aria-hidden="true"
              onClick={removeCityFromLocalStorage}
            ></i>
          )}
          <div className="homeDetails">
            <h4 className="homeDetailsHeader">{props.cityName}</h4>
            <p className="homeDetailsCelsius">{temperatore}</p>
          </div>
        </div>
        {!props.isInFavorites && (
          <button className="homeAddButton" onClick={addCityToLocalStorage}>
            <i className="fa fa-heart-o" aria-hidden="true"></i>
            Add to favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
