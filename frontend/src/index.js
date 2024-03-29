import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";

import router from "./router.js";
import { Provider } from "react-redux";
import store from "./store";
import { Interceptor } from "api/commonHttp";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ThemeProvider, createTheme } from "@mui/material";

export let persistor = persistStore(store);

const theme = createTheme({
  typography: {
    fontFamily: "nanumsquare",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Interceptor>
          <RouterProvider router={router} />
        </Interceptor>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
