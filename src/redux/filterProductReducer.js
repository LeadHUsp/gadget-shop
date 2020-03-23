import { ProductApi } from "../api/api";

const SET_FILTER_ITEMS = "filter/SET_FILTER_ITEMS";
const SET_CHECKBOX_PARAMS = "filter/SET_CHECKBOX_PARAMS";
const SET_PRICE_PARAMS = "filter/SET_PRICE_PARAMS";
const SET_SORT_PARAMS = "filter/SET_SORT_PARAMS";
let initialState = {
  filter_items: [],
  checkbox_params: "",
  price_params: "",
  sort_params: ""
};

const filterProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_ITEMS:
      return {
        ...state,
        filter_items: action.data
      };
    case SET_CHECKBOX_PARAMS:
      return {
        ...state,
        checkbox_params: action.checkbox_params
      };
    case SET_PRICE_PARAMS:
      return {
        ...state,
        price_params: action.price_params
      };
    case SET_SORT_PARAMS:
      return {
        ...state,
        sort_params: action.sort_params
      };
    default:
      return state;
  }
};

export const setFilterItems = (data) => {
  return {
    type: SET_FILTER_ITEMS,
    data
  };
};
export const setCheckBoxParams = (checkbox_params) => {
  return {
    type: SET_CHECKBOX_PARAMS,
    checkbox_params
  };
};
export const setPriceParams = (price_params) => {
  return {
    type: SET_PRICE_PARAMS,
    price_params
  };
};
export const setSortParams = (sort_params) => {
  return {
    type: SET_SORT_PARAMS,
    sort_params
  };
};

export const requestFilterItems = (slug) => {
  return async (dispatch) => {
    let response = await ProductApi.getFilterItems(slug);
    /*  console.log(response); */
    dispatch(setFilterItems(response.data));
  };
};

export default filterProductReducer;
