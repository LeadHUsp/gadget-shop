import { ProductApi } from "../api/api";

const SET_PRODUCT_DATA = "product/SET_PRODUCT_DATA";
const SET_SINGLE_PRODUCT_DATA = "product/SET_SINGLE_PRODUCT_DATA";
const SET_TOTAL_PAGES = "product/SET_TOTAL_PAGES";
const SET_IS_LOADING = "product/SET_IS_LOADING";

let initialState = {
  products_data: [],
  single_product_data: [],
  totalPages: 0,
  perPage: 3,
  isLoading: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DATA:
      return {
        ...state,
        products_data: action.data,
      };
    case SET_SINGLE_PRODUCT_DATA:
      return {
        ...state,
        single_product_data: action.data,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const setProductData = (data) => {
  return {
    type: SET_PRODUCT_DATA,
    data,
  };
};
export const setTotalPages = (totalPages) => {
  return {
    type: SET_TOTAL_PAGES,
    totalPages,
  };
};
export const setSingleProductData = (data) => {
  return {
    type: SET_SINGLE_PRODUCT_DATA,
    data,
  };
};
export const setIsLoading = () => {
  return {
    type: SET_IS_LOADING,
  };
};

export const requestProductData = (slug, currentPage, perPage, params = "") => {
  return async (dispatch) => {
    try {
      let response = await ProductApi.getProducts(slug, currentPage, perPage, params);
      console.log(params);
      dispatch(setProductData(response.data));
      dispatch(setTotalPages(response.headers.x_totalpages));
      dispatch(setIsLoading());
    } catch (err) {
      console.log(err);
    }
  };
};

export const requestSingleProductData = (slug, id) => {
  return async (dispatch) => {
    let response = await ProductApi.getSingleProduct(slug, id);
    /* console.log(response); */
    dispatch(setSingleProductData(response.data));
  };
};

export default productReducer;
