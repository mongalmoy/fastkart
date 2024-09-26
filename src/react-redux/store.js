import { configureStore } from "@reduxjs/toolkit";
import rootReducer from ".";

export function makeStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
