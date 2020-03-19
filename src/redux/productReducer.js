import { ProductApi } from "../api/api";

const SET_PRODUCT_DATA = "product/SET_PRODUCT_DATA";
const SET_TOTAL_PAGES = "product/SET_TOTAL_PAGES";
const SET_CURRENT_PAGE = "product/SET_CURRENT_PAGE";

let initialState = {
  products_data: [],
  totalPages: 0,
  currentPage: 1
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return {
        ...state,
        products_data: action.data
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    default:
      return state;
  }
};

export const setProductData = (data) => {
  return {
    type: SET_PRODUCT_DATA,
    data
  };
};
export const setTotalPages = (totalPages) => {
  return {
    type: SET_TOTAL_PAGES,
    totalPages
  };
};
export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  };
};

export const requestProductData = (slug, currentPage, perPage) => {
  return async (dispatch) => {
    let response = await ProductApi.getProducts(slug, currentPage, perPage);
    /*   console.log(response); */
    dispatch(setProductData(response.data));
    dispatch(setTotalPages(response.headers.x_totalpages));
  };
};

export default productReducer;
