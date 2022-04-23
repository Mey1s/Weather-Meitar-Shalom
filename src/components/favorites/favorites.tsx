import React, { useEffect, useState } from "react";
import { CurrentWeatherConditionExtanded } from "../../types/currentWeatherCondition";
import CurrentWeather from "../home/currentWeather/currentWeather";

import "./favorites.scss";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  const getFavoritesFromLocalStorage = () => {
    const currentFavorites = JSON.parse(
      String(localStorage.getItem("favorites"))
    );

    if (currentFavorites) {
      console.log(currentFavorites);
      setFavorites(currentFavorites);
    }
  };

  return (
    <main className="favoritesRow">
      {favorites.map((favorite: CurrentWeatherConditionExtanded, i) => {
        return (
          <CurrentWeather
            key={i}
            cityName={favorite.LocalizedName}
            cityLocationKey={favorite.Key}
          />
        );
      })}
    </main>
  );
};

export default Favorites;
