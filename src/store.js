import { createStore, applyMiddleware, combineReducers } from "redux";
import frontEnd from "./ducks/frontEnd";
import promiseMiddleware from "redux-promise-middleware";

const reducer = combineReducers({
  frontEnd: frontEnd
});

export default createStore(reducer, applyMiddleware(promiseMiddleware()));
