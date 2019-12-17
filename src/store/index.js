import { createStore, compose } from "redux";
// import thunk from 'redux-thunk'; służy do robienia asynchronicznych akcji
import reducers from "./reducers";

const store = createStore(
  reducers,
  compose(
    // applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
