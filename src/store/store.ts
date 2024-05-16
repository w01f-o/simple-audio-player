import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player/playerSlice";
import { tracksAPI } from "../services/trackAPI.ts";

const rootReducer = combineReducers({
  player: playerReducer,
  [tracksAPI.reducerPath]: tracksAPI.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(tracksAPI.middleware),
    devTools: false,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
