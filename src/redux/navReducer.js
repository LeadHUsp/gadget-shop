import { NavigationApi } from "../api/api";

const SET_NAV_DATA = "nav/SET_NAV_DATA";

let initialState = {
  nav_links: []
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV_DATA:
      return {
        ...state,
        nav_links: action.links
      };
    default:
      return state;
  }
};

export const setNavLinks = (links) => {
  return {
    type: SET_NAV_DATA,
    links
  };
};

export const requestLinks = () => {
  return async (dispatch) => {
    let response = await NavigationApi.getNavLinks();
    /*     console.log(response); */
    dispatch(setNavLinks(response.data));
  };
};

export default navReducer;
