import React, { useEffect, useState } from "react";
import CurrentWeather from "../home/currentWeather/currentWeather";

import "./favorites.css";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  const getFavoritesFromLocalStorage = () => {
    const currentFavorites = JSON.parse(
      localStorage.getItem("favorites") || ""
    );

    if (currentFavorites) {
      setFavorites(currentFavorites);
    }
  };

  return (
    <main className="favoritesRow">
      {favorites.map((favorite: any, i) => {
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
