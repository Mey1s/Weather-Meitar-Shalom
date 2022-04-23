import { createSlice, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { celciusSign, fahrenheitSign } from "../consts";

const weatherAppSlice = createSlice({
  name: "weatherApp",
  initialState: {
    darkMode: false,
    temperatureUnit: celciusSign,
    selectedCityKey: "215854",
    selectedCityName: "Tel Aviv",
  },
  reducers: {
    toggleDarkmode: (state) => {
      state.darkMode = !state.darkMode;
    },
    changeTemperatureUnit: (state) => {
      state.temperatureUnit = state.temperatureUnit === celciusSign ? fahrenheitSign : celciusSign;
    },
    changeSelectedCityKey: (state, {payload}) => {
      state.selectedCityKey = payload;
    },
    changeSelectedCityName: (state, {payload}) => {
      state.selectedCityName = payload;
    },
  },
});

export const {
  toggleDarkmode,
  changeTemperatureUnit,
  changeSelectedCityKey,
  changeSelectedCityName,
} = weatherAppSlice.actions;

export const weatherAppStore = configureStore({
  reducer: weatherAppSlice.reducer,
});

export type WeatherAppDispatch = typeof weatherAppStore.dispatch;
export type WeatherAppState = ReturnType<typeof weatherAppStore.getState>;
export const useWeatherAppDispatch = () => useDispatch<WeatherAppDispatch>();
export const useWeatherAppSelector: TypedUseSelectorHook<WeatherAppState> =
  useSelector;
