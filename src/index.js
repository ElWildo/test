import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  rootElement
);
