import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Categorymaster from "../components/Categorymaster";
import Productlist from "../components/Productlist";
import Productmaster from "../components/Productmaster";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "categorymaster",
        element: <Categorymaster />,
      },
      {
        path: "productmaster",
        element: <Productmaster />,
      },
      {
        path: "productlist",
        element: <Productlist />,
      },
    ],
  },
]);

export default appRouter;
