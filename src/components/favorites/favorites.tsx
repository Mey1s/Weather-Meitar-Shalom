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
      setFavorites(currentFavorites);
    }
  };

  return (
    <main className="favoritesRow">
      {
        favorites.length === 0 &&
        <h1 className="favoritesTitle">You have'nt saved favorite cities yet</h1>
      }
      {favorites.map((favorite: CurrentWeatherConditionExtanded, i) => {
        return (
          <CurrentWeather
            key={i}
            cityName={favorite.LocalizedName}
            cityLocationKey={favorite.Key}
            isInFavorites={true}
          />
        );
      })}
    </main>
  );
};

export default Favorites;
