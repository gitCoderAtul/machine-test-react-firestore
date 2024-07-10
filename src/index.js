import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routing/Routing";
import { Provider } from "react-redux";
import appStore from "./redux/store";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
  </Provider>
);
