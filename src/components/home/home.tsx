import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { accuWeatherApiKey } from "../../consts";
import { fetchApiGet } from "../../services/api";
import { Autocomplete } from "../../types/autocomplete";
import CurrentWeather from "./currentWeather/currentWeather";
import FiveDaysWeather from "./fiveDaysWeather/fiveDaysWeather";

import "./home.css";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompletes, setAutoCompletes] = useState<Autocomplete[]>([]);
  const [cityLocationKey, setCityLocationKey] = useState("215854");
  const [cityName, setCityName] = useState("Tel Aviv");

  useEffect(() => {
    getAutocomplete();
  }, [searchQuery]);

  const getAutocomplete = async () => {
    if (searchQuery !== "" && /^[a-zA-Z]+$/.test(searchQuery)) {
      // const newAutocompletes: Autocomplete[] = await fetchApiGet(
      //   `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apiKey=${accuWeatherApiKey}&q=${searchQuery}`
      // );
      const newAutocompletes: Autocomplete[] = await fetchApiGet(
       "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=zMNPiORpciVYF0n5Z12HKGjPIPsxnW9W&q=tel"
      );
      setAutoCompletes(newAutocompletes);
    }
    else{
      toast.error("The search value must be in English!");
    }
  };

  return (
    <main className="homeContainer">
      <div className="searchContainerInHome">
        <input
          className="searchInputInHome"
          type="text"
          placeholder="search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          className="autoCompleteInHome"
          style={{ display: searchQuery.length > 0 ? "block" : "none" }}
        >
          <ul className="listInAutoCompleteInHome">
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
      <CurrentWeather cityLocationKey={cityLocationKey} cityName={cityName} />
      <FiveDaysWeather cityLocationKey={cityLocationKey} />
    </main>
  );
};

export default Home;
