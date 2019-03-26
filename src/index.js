import React from "react";
import ReactDOM from "react-dom";
import Routers from "./router/index.js";
import { Provider } from "react-redux";
import Store from "./redux/store/index";
ReactDOM.render(
  <Provider store={Store}>
    <Routers />
  </Provider>,
  document.getElementById("root")
);
