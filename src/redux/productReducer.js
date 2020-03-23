import { ProductApi } from "../api/api";

const SET_PRODUCT_DATA = "product/SET_PRODUCT_DATA";
const SET_TOTAL_PAGES = "product/SET_TOTAL_PAGES";

let initialState = {
  products_data: [],
  totalPages: 0,
  perPage: 3
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

export const requestProductData = (slug, currentPage, perPage, params = "") => {
  return async (dispatch) => {
    let response = await ProductApi.getProducts(
      slug,
      currentPage,
      perPage,
      params
    );
    console.log(response);
    dispatch(setProductData(response.data));
    dispatch(setTotalPages(response.headers.x_totalpages));
  };
};

export default productReducer;
