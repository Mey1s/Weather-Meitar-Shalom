import axios from "axios";
import { accuWeatherApiKey } from "../consts";
import { Autocomplete } from "../types/autocomplete";
import { CurrentWeatherCondition } from "../types/currentWeatherCondition";
import { FiveDaysForecasts } from "../types/fiveDaysForecasts";

const axiosBaseAccuWeather = axios.create({
  baseURL: "https://dataservice.accuweather.com/",
  params: {
    apikey: accuWeatherApiKey,
  },
});

// Get autocompletes list
export const getAutocompletes = async (q: string): Promise<Autocomplete[]> => {
  try {
    return (
      await axiosBaseAccuWeather.get<Autocomplete[]>(
        `locations/v1/cities/autocomplete`,
        { params: { q } }
      )
    ).data;
  } catch (err) {
    throw new Error(String(err));
  }
};

// Get current city weather condition
export const getCurrentCityWeather = async (
  cityLocationKey: string
): Promise<CurrentWeatherCondition> => {
  try {
    return (
      await axiosBaseAccuWeather.get<CurrentWeatherCondition[]>(
        `currentconditions/v1/${cityLocationKey}`
      )
    ).data[0];
  } catch (err) {
    throw new Error(String(err));
  }
};


// Get five days forecasts
export const getFiveDaysForecasts = async (
  cityLocationKey: string
): Promise<FiveDaysForecasts> => {
  try {
    return (
      await axiosBaseAccuWeather.get<FiveDaysForecasts>(
        `forecasts/v1/daily/5day/${cityLocationKey}`
      )
    ).data;
  } catch (err) {
    throw new Error(String(err));
  }
};
