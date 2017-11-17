import { createStore, applyMiddleware, combineReducers } from "redux";
import frontEnd from "./ducks/frontEnd";
import restaurant from "./ducks/restaurant";
import promiseMiddleware from "redux-promise-middleware";

const reducer = combineReducers({
  frontEnd: frontEnd,
  restaurant: restaurant
});

export default createStore(reducer, applyMiddleware(promiseMiddleware()));
