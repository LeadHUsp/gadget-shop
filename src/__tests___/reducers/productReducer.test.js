import productReducer, {
  setProductData,
  setTotalPages,
  setSingleProductData,
  setIsLoading,
  requestProductData,
  requestSingleProductData
} from "../../redux/productReducer";

let initialState = {
  products_data: [],
  single_product_data: [],
  totalPages: 0,
  perPage: 3,
  isLoading: true
};

it("product data should be set", () => {
  let data = [
    {
      title: "app",
      name: "test"
    }
  ];
  let action = setProductData(data);
  let newState = productReducer(initialState, action);
  expect(newState.products_data.length).toBe(1);
});
it("product data.name[0] should be currect", () => {
  let data = [
    {
      title: "app",
      name: "currect"
    }
  ];
  let action = setProductData(data);
  let newState = productReducer(initialState, action);

  expect(newState.products_data[0].name).toBe("currect");
});
it("totalPages should be = 1", () => {
  let data = 1;
  let action = setTotalPages(data);
  let newState = productReducer(initialState, action);

  expect(newState.totalPages).toBe(1);
});
it("single_product_data should be set", () => {
  let data = [
    {
      title: "app",
      name: "currect"
    }
  ];
  let action = setSingleProductData(data);
  let newState = productReducer(initialState, action);
  expect(newState.single_product_data.length).toBe(1);
});
it("single_product_data.name[0] should be currect", () => {
  let data = [
    {
      title: "app",
      name: "currect"
    }
  ];
  let action = setSingleProductData(data);
  let newState = productReducer(initialState, action);

  expect(newState.single_product_data[0].name).toBe("currect");
});
it("isLoading should be false", () => {
  let action = setIsLoading();
  let newState = productReducer(initialState, action);
  expect(newState.isLoading).toBe(false);
});
