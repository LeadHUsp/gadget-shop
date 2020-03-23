import { HomeApi } from "../api/api";

const SET_PROMO_DATA = "home/SET_PROMO_DATA";
const SET_CATEGORIES_DATA = "home/SET_CATEGORIES_DATA";
const SET_BLOG_DATA = "home/SET_BLOG_DATA";

let initialState = {
  promo_items: [],
  categories_items: [],
  blog_items: []
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROMO_DATA:
      return {
        ...state,
        promo_items: action.items
      };
    case SET_CATEGORIES_DATA:
      return {
        ...state,
        categories_items: action.items
      };
    case SET_BLOG_DATA:
      return {
        ...state,
        blog_items: action.items
      };
    default:
      return state;
  }
};

export const setPromoItems = (items) => {
  return {
    type: SET_PROMO_DATA,
    items
  };
};
export const setCategoriesItems = (items) => {
  return {
    type: SET_CATEGORIES_DATA,
    items
  };
};
export const setBlogItems = (items) => {
  return {
    type: SET_BLOG_DATA,
    items
  };
};

export const requestPromoItems = () => {
  return async (dispatch) => {
    let response = await HomeApi.getPromoItems();
    dispatch(setPromoItems(response.data));
  };
};
export const requestCategories = () => {
  return async (dispatch) => {
    let response = await HomeApi.getCategories();
    /* console.log(response); */
    dispatch(setCategoriesItems(response.data));
  };
};
export const requestBlogItems = () => {
  return async (dispatch) => {
    let response = await HomeApi.getArticles();
    dispatch(setBlogItems(response.data));
  };
};

export default homeReducer;
