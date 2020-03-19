import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import navReducer from "./navReducer";
import homeReducer from "./homeReducer";
import productReducer from "./productReducer";

let reducers = combineReducers({
  navigation: navReducer,
  home: homeReducer,
  products: productReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
