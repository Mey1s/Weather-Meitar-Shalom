import { useEffect, useState } from "react";
import { localStorageFavorites } from "../../consts";
import { CurrentWeatherConditionExtanded } from "../../types/currentWeatherCondition";
import CurrentWeather from "../home/currentWeather/currentWeather";
import "./favorites.scss";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  const getFavoritesFromLocalStorage = () => {
    const currentFavorites = JSON.parse(
      String(localStorage.getItem(localStorageFavorites))
    );

    if (currentFavorites) {
      setFavorites(currentFavorites);
    }
  };

  return (
    <main className="favoritesRow">
      {/* If there is no favorites */}
      {favorites.length === 0 && (
        <h1 className="favoritesTitle">
          You have'nt saved favorite cities yet
        </h1>
      )}

      {/* display all favorite cities */}
      {favorites.map((favorite: CurrentWeatherConditionExtanded, i) => {
        return (
          <CurrentWeather
            key={i}
            cityName={favorite.LocalizedName}
            cityLocationKey={favorite.Key}
            isInFavorites={true}
            getFavoritesFromLocalStorage={getFavoritesFromLocalStorage}
          />
        );
      })}
    </main>
  );
};

export default Favorites;
