import axios from "axios";
import { accuWeatherApiKey } from "../consts";
import { Autocomplete } from "../types/autocomplete";
import { CurrentWeatherCondition } from "../types/currentWeatherCondition";
import { FiveDaysForecasts } from "../types/fiveDaysForecasts";

const axiosInstance = axios.create({
  baseURL: "https://dataservice.accuweather.com/",
  params: {
    apikey: accuWeatherApiKey,
  },
});

export const getAutocompletes = async (q: string): Promise<Autocomplete[]> => {
  try {
    return (
      await axiosInstance.get<Autocomplete[]>(
        `locations/v1/cities/autocomplete`,
        { params: { q } }
      )
    ).data;
  } catch (error) {
    throw new Error("City not found.");
  }
};

export const getCurrentCityWeather = async (
  cityLocationKey: string
): Promise<CurrentWeatherCondition> => {
  try {
    return (
      await axiosInstance.get<CurrentWeatherCondition[]>(
        `currentconditions/v1/${cityLocationKey}`
      )
    ).data[0];
  } catch (error) {
    throw new Error("City weather info is not available.");
  }
};

export const getFiveDaysForecasts = async (
  cityLocationKey: string
): Promise<FiveDaysForecasts> => {
  try {
    return (
      await axiosInstance.get<FiveDaysForecasts>(
        `forecasts/v1/daily/5day/${cityLocationKey}`
      )
    ).data;
  } catch (error) {
    throw new Error("Weather forecasts is not available.");
  }
};

export const fetchApiGet = async (url: string) => {
  try {
    console.log(url);
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return { err };
  }
};

export const fetchApiMethod = async (
  url: string,
  method: string,
  body: any
) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { err };
  }
};
