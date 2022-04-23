import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as weather from "../../redux/weather";
import { getAutocompletes } from "../../services/api";
import { Autocomplete } from "../../types/autocomplete";
import CurrentWeather from "./currentWeather/currentWeather";
import FiveDaysWeather from "./fiveDaysWeather/fiveDaysWeather";
import "./home.scss";

const Home = () => {
  const searchCityInputRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  const { selectedCityKey, selectedCityName } = useSelector(
    (state: weather.WeatherAppState) => state
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [autocompletes, setAutoCompletes] = useState<Autocomplete[]>([]);
  const [showAutoCompleteMenu, setShowAutoCompleteMenu] =
    useState<boolean>(false);

  useEffect(() => {
    getNewAutocomplete();
  }, [searchQuery]);

  //get autocomplete list
  const getNewAutocomplete = async () => {
    //check if the search query is not empty and in English
    if (searchQuery !== "" && /^[a-zA-Z]+$/.test(searchQuery)) {
      setShowAutoCompleteMenu(true);
      getAutocompletes(searchQuery).then((newAutocompletes) => {
        setAutoCompletes(newAutocompletes);
      });
    } else {
      setShowAutoCompleteMenu(false);
    }
  };

  return (
    <main className="homeContainer">
      <div className="searchContainerHome">
        <input
          ref={searchCityInputRef}
          value={searchQuery}
          className="searchInputHome"
          type="text"
          placeholder="search city"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          className="autocompleteHome"
          style={{ display: showAutoCompleteMenu ? "block" : "none" }}
        >
          <ul className="listAutocompleteHome">
            {autocompletes.map((autocomplete, i) => {
              return (
                <li
                  key={i}
                  className="itemListAutocompleteHome"
                  // on click update the city name and key and reset search query
                  onClick={() => {
                    weather.weatherAppStore.dispatch(
                      weather.changeSelectedCityKey(autocomplete.Key)
                    );
                    weather.weatherAppStore.dispatch(
                      weather.changeSelectedCityName(autocomplete.LocalizedName)
                    );
                    setSearchQuery(autocomplete.LocalizedName);
                    setShowAutoCompleteMenu(false);
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
