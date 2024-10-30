"use client";

import { Provider } from "react-redux";
import { useState } from "react";
import { makeStore } from "./store";

export function Providers({ children, initialReduxState }) {
  const [store] = useState(() => makeStore(initialReduxState))
  return <Provider store={store}>{children}</Provider>;
}
