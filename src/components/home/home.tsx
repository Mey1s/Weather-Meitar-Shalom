import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAutocompletes } from "../../services/api";
import { Autocomplete } from "../../types/autocomplete";
import CurrentWeather from "./currentWeather/currentWeather";
import FiveDaysWeather from "./fiveDaysWeather/fiveDaysWeather";

import "./home.scss";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompletes, setAutoCompletes] = useState<Autocomplete[]>([]);
  const [cityLocationKey, setCityLocationKey] = useState("215854");
  const [cityName, setCityName] = useState("Tel Aviv");

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
                    setCityLocationKey(autocomplete.Key);
                    setCityName(autocomplete.LocalizedName);
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
        cityLocationKey={cityLocationKey}
        cityName={cityName}
        isInFavorites={false}
      />
      <FiveDaysWeather cityLocationKey={cityLocationKey} />
    </main>
  );
};

export default Home;
