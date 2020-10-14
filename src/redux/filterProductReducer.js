import { ProductApi } from "../api/api";
import produce from "immer";
import _ from "lodash";

const SET_FILTER_ITEMS = "filter/SET_FILTER_ITEMS";
const INIT_ADD_CHECKED_ITEMS = "filter/INIT_ADD_CHECKED_ITEMS";
const DELETE_CHECKED_ITEM = "filter/DELETE_CHECKED_ITEM";
const CLEAR_ALL_CHECKED_ITEMS = "filter/CLEAR_ALL_CHECKED_ITEMS";
const PUSH_CHECKED_ITEM = "filter/PUSH_CHECKED_ITEM";
const SET_CHECKBOX_PARAMS = "filter/SET_CHECKBOX_PARAMS";
const SET_LOW_PRICE_PARAMS = "filter/SET_LOW_PRICE_PARAMS";
const SET_HIGH_PRICE_PARAMS = "filter/SET_HIGH_PRICE_PARAMS";
const SET_SORT_PARAMS = "filter/SET_SORT_PARAMS";


let initialState = {
  filter_items: [],
  checkbox_params: {},
  price_params: {
    price_gt: "",
    price_lte: "",
  },

  sort_filter_params: {
    _sort: "",
  },
 
};

const filterProductReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    if (action.type === SET_FILTER_ITEMS) {
      draft.filter_items = action.data.map((item) => {
        item.values = item.values.map((value) => {
          value = {
            value_param: value,
            checked: false,
          };
          return value;
        });
        return item;
      });
    }
    if (action.type === SET_SORT_PARAMS) {
      draft.sort_filter_params._sort = action.sort_param
    }
    if (action.type === CLEAR_ALL_CHECKED_ITEMS) {
      let filter_items = [...draft.filter_items];
      filter_items.map((item) => {
        item.values = item.values.map((value) => {
          value = {
            value_param: value.value_param,
            checked: false,
          };
          return value;
        });
        return item;
      });
    }
    if (action.type === SET_CHECKBOX_PARAMS) {
      draft.checkbox_params = action.checkbox_params;
    }

    if (action.type === INIT_ADD_CHECKED_ITEMS) {
      let filter_items = [...draft.filter_items];
      let checkbox = state.checkbox_params;

      filter_items.map((item) => {
        for (let checkbox_key in checkbox) {
          if (item.param === checkbox_key) {
            if (_.isArray(checkbox[checkbox_key])) {
              item.values = item.values.map((value) => {
                if (checkbox[checkbox_key].includes(value.value_param)) {
                  value.checked = true;
                } else {
                  value.checked = false;
                }
                return value;
              });
            } else {
              item.values = item.values.map((value) => {
                if (value.value_param === checkbox[checkbox_key]) {
                  value.checked = true;
                } else {
                  value.checked = false;
                }
                return value;
              });
            }
          } 
        }
        return item;
      });
    }

    if (action.type === DELETE_CHECKED_ITEM) {
      let checkbox_params = draft.checkbox_params;
      for (let checkbox_key in checkbox_params) {
        if (checkbox_key === action.checkbox.param_name) {
          if (_.isArray(checkbox_params[checkbox_key])) {
            checkbox_params[checkbox_key] = checkbox_params[checkbox_key].filter(
              (item) => {
               
                return item !== action.checkbox.param_value;
              }
            );
          } else {
            checkbox_params[checkbox_key] = [];
          }
        }
      }
    }
    if (action.type === PUSH_CHECKED_ITEM) {
      let checkbox_params = draft.checkbox_params;
      if (_.has(checkbox_params, action.checkbox.param_name)) {
        for (let checkbox_key in checkbox_params) {
          if (checkbox_key === action.checkbox.param_name) {
            if (_.isArray(checkbox_params[checkbox_key])) {
              checkbox_params[checkbox_key] = [
                ...checkbox_params[checkbox_key],
                action.checkbox.param_value,
              ];
            } else {
              checkbox_params[checkbox_key] = [
                checkbox_params[checkbox_key],
                action.checkbox.param_value,
              ];
            }
          }
        }
      } else {
        let checkedObj = {
          [action.checkbox.param_name]: action.checkbox.param_value,
        };
        /*  console.log(checkedObj); */
        Object.assign(checkbox_params, checkedObj);
      }
    }
    if (action.type === SET_LOW_PRICE_PARAMS) {
      draft.price_params.price_gt = action.price_param;
    }
    if (action.type === SET_HIGH_PRICE_PARAMS) {
      draft.price_params.price_lte = action.price_param;
    }
   
  });
};

export const setFilterItems = (data) => {
  return {
    type: SET_FILTER_ITEMS,
    data,
  };
};
export const initAddCheckedItems = () => {
  return {
    type: INIT_ADD_CHECKED_ITEMS,
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
    type: DELETE_CHECKED_ITEM,
    checkbox,
  };
};
export const clearAllCheckedItems = () => {
  return {
    type: CLEAR_ALL_CHECKED_ITEMS,
  };
};
export const pushCheckedItem = (checkbox) => {
  return {
    type: PUSH_CHECKED_ITEM,
    checkbox,
  };
};
export const setLowPriceParam = (price_param) => {
  return {
    type: SET_LOW_PRICE_PARAMS,
    price_param,
  };
};
export const setHighPriceParam = (price_param) => {
  return {
    type: SET_HIGH_PRICE_PARAMS,
    price_param,
  };
};
export const setSortParams = (sort_param) => {
  return {
    type: SET_SORT_PARAMS,
    sort_param,
  };
};


export const requestFilterItems = (slug) => {
  return async (dispatch) => {
    let response = await ProductApi.getFilterItems(slug);
    /* console.log(response); */
    dispatch(setFilterItems(response.data));
    dispatch(initAddCheckedItems());
  };
};

export default filterProductReducer;
