import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
