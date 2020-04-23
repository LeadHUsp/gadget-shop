import { ProductApi } from "../api/api";

const SET_PRODUCT_TO_CART = "shopingCart/SET_PRODUCT_TO_CART";
const SET_SINGLE_PRODUCT_DATA = "shopingCart/SET_SINGLE_PRODUCT_DATA";
const CLEAR_RODUCT_DATA = "shopingCart/CLEAR_RODUCT_DATA";
const DELETE_PRODUCT = "shopingCart/DELETE_PRODUCT";
const INCREASE_PRODUCT_COUNT = "shopingCart/INCREASE_PRODUCT_COUNT";
const DECREASE_PRODUCT_COUNT = "shopingCart/DECREASE_PRODUCT_COUNT";
const CALCULATE_ORDER_AMOUNT = "shopingCart/CALCULATE_ORDER_AMOUNT";
let initialState = {
  products_in_cart: [
    /* { id: "5e71d1395f168d1fb4cb3b85", slug: "smartphones", count: 1 },
    { id: "5e71d1395f168d1fb4cb3b85", slug: "smartphones", count: 1 },
    { id: "5e71d1395f168d1fb4cb3b85", slug: "smartphones", count: 1 }, */
  ],
  products_in_cart_data: [],
  order_amount: 0,
};

const shopingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_TO_CART:
      return {
        ...state,
        products_in_cart: action.product,
      };
    case SET_SINGLE_PRODUCT_DATA:
      return {
        ...state,
        products_in_cart_data: [...state.products_in_cart_data, action.data],
      };
    case CLEAR_RODUCT_DATA:
      return {
        ...state,
        products_in_cart_data: [],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products_in_cart: state.products_in_cart.filter(
          (prod) => prod.id !== action.id
        ),
        products_in_cart_data: state.products_in_cart_data.filter(
          (prod) => prod.id !== action.id
        ),
      };
    case INCREASE_PRODUCT_COUNT:
      return {
        ...state,
        products_in_cart: state.products_in_cart.map((prod) => {
          if (prod.id === action.id) {
            prod.count = prod.count + 1;
          }
          return prod;
        }),
        products_in_cart_data: state.products_in_cart_data.map((prod) => {
          if (prod.id === action.id) {
            prod.count = prod.count + 1;
          }
          return prod;
        }),
      };
    case DECREASE_PRODUCT_COUNT:
      return {
        ...state,
        products_in_cart: state.products_in_cart.map((prod) => {
          if (prod.id === action.id) {
            prod.count = prod.count - 1;
          }
          return prod;
        }),
        products_in_cart_data: state.products_in_cart_data.map((prod) => {
          if (prod.id === action.id) {
            prod.count = prod.count - 1;
          }
          return prod;
        }),
      };
    case CALCULATE_ORDER_AMOUNT:
      return {
        ...state,
        order_amount: state.products_in_cart_data.reduce((acc, prod) => {
          return acc + Number(prod.count) * Number(prod.price);
        }, 0),
      };
    default:
      return state;
  }
};

export const setProductToCart = (product) => {
  return {
    type: SET_PRODUCT_TO_CART,
    product,
  };
};
export const setSingleProductData = (data) => {
  return {
    type: SET_SINGLE_PRODUCT_DATA,
    data,
  };
};
export const clearProductData = () => {
  return {
    type: CLEAR_RODUCT_DATA,
  };
};
export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id,
  };
};
export const increaseProductCount = (id) => {
  return {
    type: INCREASE_PRODUCT_COUNT,
    id,
  };
};
export const decreaseProductCount = (id) => {
  return {
    type: DECREASE_PRODUCT_COUNT,
    id,
  };
};
export const calculateOrderAmount = () => {
  return {
    type: CALCULATE_ORDER_AMOUNT,
  };
};
export const requestSingleProductData = (slug, id, count = 1) => {
  return async (dispatch) => {
    let response = await ProductApi.getSingleProduct(slug, id);
    response.data.count = count;
    response.data.slug = slug;
    dispatch(setSingleProductData(response.data));
  };
};

export default shopingCartReducer;
