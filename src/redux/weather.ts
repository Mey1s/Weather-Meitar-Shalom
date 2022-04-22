import { createSlice, configureStore } from "@reduxjs/toolkit";

const weatherAppSlice = createSlice({
  name: "weatherApp",
  initialState: {
    darkMode: false,
    temperatureUnit: "C",
  },
  reducers: {
    toggleDarkmode: (state) => {
      state.darkMode = !state.darkMode;
    },
    changeTemperatureUnit: (state) => {
      state.temperatureUnit = state.temperatureUnit === "C" ? "F" : "C";
    },
  },
});

export const { toggleDarkmode, changeTemperatureUnit } =
  weatherAppSlice.actions;

export const weatherAppStore = configureStore({
  reducer: weatherAppSlice.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type WeatherAppState = ReturnType<typeof weatherAppStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type WeatherAppDispatch = typeof weatherAppStore.dispatch;

// store.dispatch(toggleDarkmode());
