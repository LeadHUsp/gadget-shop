import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import navReducer from "./navReducer";
import homeReducer from "./homeReducer";
import productReducer from "./productReducer";
import filterProductReducer from "./filterProductReducer";
import preloaderReducer from "./preloaderReducer";
import shopingCartReducer from "./shopingCartReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
  navigation: navReducer,
  home: homeReducer,
  products: productReducer,
  filterProduct: filterProductReducer,
  preloader: preloaderReducer,
  shopingCart: shopingCartReducer,
  form: formReducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
