import { ProductApi } from "../api/api";
import produce from "immer";
import _ from "lodash";

const SET_FILTER_ITEMS = "filter/SET_FILTER_ITEMS";
const INIT_ADD_CHECKED_ITEMS = "filter/INIT_ADD_CHECKED_ITEMS";
const DELETE_CHECKED_ITEM = "filter/DELETE_CHECKED_ITEM";
const PUSH_CHECKED_ITEM = "filter/PUSH_CHECKED_ITEM";
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
                console.log(item !== action.checkbox.param_value);
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
  });
  /*  switch (action.type) {
    case SET_FILTER_ITEMS:
      return produce(state, (draft) => {
        draft.filter_items = action.data;
      });
    case SET_CHECKBOX_PARAMS:
      return produce(state, (draft) => {
        draft.checkbox_params = action.checkbox_params;
      });
    case INIT_ADD_CHECKED_ITEMS:
      return produce(state, (draft) => {
        let filter_items = [...draft.filter_items];
        let checkbox = state.checkbox_params;
        filter_items.map((item) => {
          for (let checkbox_key in checkbox) {
            if (item.param === checkbox_key) {
              if (_.isArray(checkbox[checkbox_key])) {
                item.values = item.values.map((value) => {
                  if (checkbox[checkbox_key].includes(value)) {
                    value = {
                      value: value,
                      checked: true,
                    };
                  } else {
                    value = {
                      value: value,
                      checked: false,
                    };
                  }
                  return value;
                });
              } else {
                item.values = item.values.map((value) => {
                  if (value === checkbox[checkbox_key]) {
                    value = {
                      value: value,
                      checked: true,
                    };
                  } else {
                    value = {
                      value: value,
                      checked: false,
                    };
                  }
                  return value;
                });
              }
            }
          }
          return item;
        });
      });
    case DELETE_CHECKED_ITEMS:
      return produce(state, (draft) => {
        console.log(state.checkbox_params);
        let checkbox_params = state.checkbox_params;
        for (let checkbox_key in checkbox_params) {
          if (checkbox_key === action.checkbox.param_name) {
            console.log("checkbox_key === checkbox.param_name");
            if (_.isArray(checkbox_params[checkbox_key])) {
              console.log("_.isArray(checkbox_params[checkbox_key])");
              checkbox_params.checkbox_key = checkbox_params[checkbox_key].filter(
                (item) => {
                  return item !== action.checkbox.param_value;
                }
              );
              console.log(checkbox_params[checkbox_key]);
            } else {
              delete checkbox_params.checkbox_key;
            }
          }
        }
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
  } */
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
export const pushCheckedItem = (checkbox) => {
  return {
    type: PUSH_CHECKED_ITEM,
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
    console.log(response);
    dispatch(setFilterItems(response.data));
    dispatch(initAddCheckedItems());
  };
};

export default filterProductReducer;
