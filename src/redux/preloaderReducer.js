const SET_IS_LOADING = "product/SET_IS_LOADING";

let initialState = {
  isLoading: true
};

const preloaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export const setIsLoading = () => {
  return {
    type: SET_IS_LOADING
  };
};

export default preloaderReducer;
