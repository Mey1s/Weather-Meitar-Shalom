import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { celciusSign, currentWeatherInitial, fahrenheitSign, localStorageFavorites } from "../../../consts";
import * as weather from "../../../redux/weather";
import { getCurrentCityWeather } from "../../../services/api";
import {
  CurrentWeatherCondition,
  CurrentWeatherConditionExtanded,
} from "../../../types/currentWeatherCondition";
import "./currentWeather.scss";

interface CurrentWeatherProps {
  cityLocationKey: string;
  cityName: string;
  // to detect if it's from favorites components or not
  isInFavorites: boolean;
  getFavoritesFromLocalStorage?: Function;
}

const CurrentWeather = ({
  cityLocationKey,
  cityName,
  isInFavorites,
  getFavoritesFromLocalStorage,
}: CurrentWeatherProps) => {
  const navigate = useNavigate();
  const [currentWeatherCondition, setCurrentWeatherCondition] =
    useState<CurrentWeatherCondition>(currentWeatherInitial);
  const { temperatureUnit, selectedCityKey, selectedCityName } = useSelector(
    (state: weather.WeatherAppState) => state
  );

  // Calculate temperatore
  const temperatore =
    temperatureUnit === celciusSign
      ? `${currentWeatherCondition.Temperature.Metric.Value.toFixed(0)}${celciusSign}`
      : `${currentWeatherCondition.Temperature.Imperial.Value.toFixed(0)}${fahrenheitSign}`;

  useEffect(() => {
    getNewCurrentWeatherCondition();
  }, [
    cityLocationKey,
    cityName,
    isInFavorites,
    selectedCityName,
    selectedCityKey,
  ]);

  // Get current city weather condition
  const getNewCurrentWeatherCondition = async () => {
    getCurrentCityWeather(cityLocationKey).then(
      (newCurrentWeatherCondition) => {
        setCurrentWeatherCondition(newCurrentWeatherCondition);
      }
    );
  };

  // Remove city from local storage
  const removeCityFromLocalStorage = () => {
    const currentFavorites = JSON.parse(
      String(localStorage.getItem(localStorageFavorites))
    );
    if (currentFavorites) {
      // Remove the item by key
      const newCurrentWeatherCondition = currentFavorites.filter(
        (favorite: CurrentWeatherConditionExtanded) =>
          favorite.Key !== cityLocationKey
      );
      localStorage.setItem(
        localStorageFavorites,
        JSON.stringify(newCurrentWeatherCondition)
      );
      
      getFavoritesFromLocalStorage &&  getFavoritesFromLocalStorage();
        
    }
  };

  //add city to local storage
  const addCityToLocalStorage = () => {
    const currentFavorites = JSON.parse(
      String(localStorage.getItem(localStorageFavorites))
    );

    if (!currentFavorites) {
      localStorage.setItem(
        localStorageFavorites,
        JSON.stringify([
          {
            ...currentWeatherCondition,
            LocalizedName: cityName,
            Key: cityLocationKey,
          },
        ])
      );
    } else {
      currentFavorites.map((city: CurrentWeatherConditionExtanded) => {
        if (city.Key === cityLocationKey) {
          throw alert(`You have already added ${cityName}`);
        }
      });

      localStorage.setItem(
        localStorageFavorites,
        JSON.stringify([
          ...currentFavorites,
          {
            ...currentWeatherCondition,
            LocalizedName: cityName,
            Key: cityLocationKey,
          },
        ])
      );
    }
  };

  //update selected city key
  const updateSelectedCityKey = () => {
    weather.weatherAppStore.dispatch(
      weather.changeSelectedCityKey(cityLocationKey)
    );
    weather.weatherAppStore.dispatch(weather.changeSelectedCityName(cityName));
    navigate("/");
  };

  return (
    <div className="homeMainColumn">
      <div className="homeTopButtonsRow">
        <div className="homeTopButtonsLeft">
          {isInFavorites && (
            <i
              role="button"
              className="fa fa-times"
              aria-hidden="true"
              onClick={removeCityFromLocalStorage}
            ></i>
          )}
          <div className="homeDetails">
            <h4 className="homeDetailsHeader" onClick={updateSelectedCityKey}>{cityName}</h4>
            <p className="homeDetailsCelsius">{temperatore}&deg;</p>
          </div>
        </div>
        {!isInFavorites && (
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
