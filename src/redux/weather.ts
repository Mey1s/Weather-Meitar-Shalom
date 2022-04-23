import { createSlice, configureStore } from "@reduxjs/toolkit";

const weatherAppSlice = createSlice({
  name: "weatherApp",
  initialState: {
    darkMode: false,
    temperatureUnit: "C",
    selectedCityKey: "215854",
    selectedCityName: "Tel Aviv"
  },
  reducers: {
    toggleDarkmode: (state) => {
      state.darkMode = !state.darkMode;
    },
    changeTemperatureUnit: (state) => {
      state.temperatureUnit = state.temperatureUnit === "C" ? "F" : "C";
    },
    changeSelectedCityKey: (state, actions) => {
      console.log(actions.payload);
      state.selectedCityKey = actions.payload;
    },
    changeSelectedCityName: (state, actions) => {
      console.log(actions.payload);
      state.selectedCityName = actions.payload;
    }
  },
});

export const { toggleDarkmode, changeTemperatureUnit, changeSelectedCityKey, changeSelectedCityName } =
  weatherAppSlice.actions;

export const weatherAppStore = configureStore({
  reducer: weatherAppSlice.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type WeatherAppState = ReturnType<typeof weatherAppStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type WeatherAppDispatch = typeof weatherAppStore.dispatch;
