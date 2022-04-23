import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  WeatherAppState,
  changeSelectedCityName,
  changeSelectedCityKey,
  weatherAppStore,
} from "../../redux/weather";
import { getAutocompletes } from "../../services/api";
import { Autocomplete } from "../../types/autocomplete";
import CurrentWeather from "./currentWeather/currentWeather";
import FiveDaysWeather from "./fiveDaysWeather/fiveDaysWeather";

import "./home.scss";

const Home: React.FC = () => {
  const selectedCityKey = useSelector(
    (state: WeatherAppState) => state.selectedCityKey
  );
  const selectedCityName = useSelector(
    (state: WeatherAppState) => state.selectedCityName
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompletes, setAutoCompletes] = useState<Autocomplete[]>([]);

  useEffect(() => {
    getNewAutocomplete();
  }, [searchQuery]);

  const getNewAutocomplete = async () => {
    if (searchQuery !== "" && /^[a-zA-Z]+$/.test(searchQuery)) {
      getAutocompletes(searchQuery).then((newAutocompletes) => {
        setAutoCompletes(newAutocompletes);
      });
    }
  };

  return (
    <main className="homeContainer">
      <div className="searchContainerHome">
        <input
          className="searchInputHome"
          type="text"
          placeholder="search city"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          className="autocompleteHome"
          style={{ display: searchQuery.length > 0 ? "block" : "none" }}
        >
          <ul className="listAutocompleteHome">
            {autocompletes.map((autocomplete, i) => {
              return (
                <li
                  key={i}
                  className="itemListAutocompleteHome"
                  onClick={() => {
                    weatherAppStore.dispatch(changeSelectedCityKey(autocomplete.Key));
                    weatherAppStore.dispatch(changeSelectedCityName(autocomplete.LocalizedName));
                  }}
                >
                  {autocomplete.LocalizedName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <CurrentWeather
        cityLocationKey={selectedCityKey}
        cityName={selectedCityName}
        isInFavorites={false}
      />
      <FiveDaysWeather cityLocationKey={selectedCityKey} />
    </main>
  );
};

export default Home;
