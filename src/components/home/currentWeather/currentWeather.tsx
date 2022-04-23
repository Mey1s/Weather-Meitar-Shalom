import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentWeatherInitial } from "../../../consts";
import {
  WeatherAppState,
  changeSelectedCityKey,
  changeSelectedCityName,
  weatherAppStore,
} from "../../../redux/weather";
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
  const navigate = useNavigate();
  const [currentWeatherCondition, setCurrentWeatherCondition] =
    useState<CurrentWeatherCondition>(currentWeatherInitial);
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
    console.log(currentFavorites);
    if (currentFavorites) {
      const newCurrentWeatherCondition = currentFavorites.filter(
        (favorite: CurrentWeatherConditionExtanded) =>
          favorite.Key !== props.cityLocationKey
      );
      console.log(newCurrentWeatherCondition);
      localStorage.setItem("favorites", JSON.stringify(newCurrentWeatherCondition));
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
          throw alert(`You have already added ${props.cityName}`);
        }
      });

      localStorage.setItem(
        "favorites",
        JSON.stringify([
          ...currentFavorites,
          {
            ...currentWeatherCondition,
            LocalizedName: props.cityName,
            Key: props.cityLocationKey,
          },
        ])
      );
    }
  };

  const updateSelectedCityKey = () => {
    weatherAppStore.dispatch(changeSelectedCityKey(props.cityLocationKey));
    weatherAppStore.dispatch(changeSelectedCityName(props.cityName));
    navigate("/");
  };

  return (
    <div className="homeMainColumn">
      <div className="homeTopButtonsRow">
        <div className="homeTopButtonsLeft" onClick={updateSelectedCityKey}>
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
