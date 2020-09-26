import { ProductApi } from "../api/api";
import produce from "immer";
import _ from "lodash";

const SET_FILTER_ITEMS = "filter/SET_FILTER_ITEMS";
const ADD_CHECKED_ITEMS = "filter/ADD_CHECKED_ITEMS";
const DELETE_CHECKED_ITEMS = "filter/DELETE_CHECKED_ITEMS";
const SET_CHECKBOX_PARAMS = "filter/SET_CHECKBOX_PARAMS";
const SET_PRICE_PARAMS = "filter/SET_PRICE_PARAMS";
const SET_SORT_PARAMS = "filter/SET_SORT_PARAMS";
let initialState = {
  filter_items: [],
  checkbox_params: {},
  price_params: "",
  sort_params: "",
};

const filterProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_ITEMS:
      return produce(state, (draft) => {
        draft.filter_items = action.data;
      });
    case ADD_CHECKED_ITEMS:
      return produce(state, (draft) => {
        let filter_items = [...draft.filter_items];
        let checkbox = state.checkbox_params;
        filter_items.map((item) => {
          for (let checkbox_key in checkbox) {
            if (item.param === checkbox_key) {
              item.checked = [];
              if (_.isArray(checkbox[checkbox_key])) {
                item.checked = [...checkbox[checkbox_key]];
                checkbox[checkbox_key].map((checkboxValue) => {
                  item.values = item.values.filter((value) => {
                    return value !== checkboxValue;
                  });
                });
              } else {
                item.checked = [checkbox[checkbox_key]];
                item.values = item.values.filter((value) => {
                  return value !== checkbox[checkbox_key];
                });
              }
            }
          }
          return item;
        });
      });
    case DELETE_CHECKED_ITEMS:
      return produce(state, (draft, action) => {
        console.log(action);
        let checkbox = draft.checkbox_params;
        for (let checkbox_key in checkbox) {
          if (checkbox_key === action.checkbox.param_name) {
            console.log("flag1");
            if (_.isArray(checkbox[checkbox_key])) {
              console.log("flag2");
              checkbox[checkbox_key] = checkbox[checkbox_key].filter((item) => {
                return item !== action.checkbox.param_value;
              });
            }
          }
        }
      });
    case SET_CHECKBOX_PARAMS:
      return produce(state, (draft) => {
        draft.checkbox_params = action.checkbox_params;
      });
    case SET_PRICE_PARAMS:
      return {
        ...state,
        price_params: action.price_params,
      };
    case SET_SORT_PARAMS:
      return {
        ...state,
        sort_params: action.sort_params,
      };
    default:
      return state;
  }
};

export const setFilterItems = (data) => {
  return {
    type: SET_FILTER_ITEMS,
    data,
  };
};
export const addCheckedItems = () => {
  return {
    type: ADD_CHECKED_ITEMS,
  };
};
export const setCheckBoxParams = (checkbox_params) => {
  return {
    type: SET_CHECKBOX_PARAMS,
    checkbox_params,
  };
};
export const deleteCheckedItem = (checkbox) => {
  return {
    type: DELETE_CHECKED_ITEMS,
    checkbox,
  };
};
export const setPriceParams = (price_params) => {
  return {
    type: SET_PRICE_PARAMS,
    price_params,
  };
};
export const setSortParams = (sort_params) => {
  return {
    type: SET_SORT_PARAMS,
    sort_params,
  };
};

export const requestFilterItems = (slug) => {
  return async (dispatch) => {
    let response = await ProductApi.getFilterItems(slug);
    dispatch(setFilterItems(response.data));
    dispatch(addCheckedItems());
  };
};

export default filterProductReducer;
