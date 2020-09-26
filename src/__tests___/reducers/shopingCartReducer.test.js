import shopingCartReducer, {
  setSingleProductData,
  setProductToCart,
} from "../../redux/shopingCartReducer";

let initialState = {
  products_in_cart: [],
  products_in_cart_data: [],
};

it("products in cart should be set", () => {
  let data = [
    {
      id: 22234,
      slug: "smart",
    },
  ];
  let action = setProductToCart(data);
  let newState = shopingCartReducer(initialState, action);
  expect(newState.products_in_cart.length).toBe(1);
});
it("product data in cart should be set", () => {
  let count = 2;
  let data = {
    protect: "IP67",
    quick_charge: true,
    _id: "5e71d1395f168d1fb4cb3b85",
    internal_memory: 64,
    __v: 0,
    card_image: "https://i.ibb.co/Y8qJggF/Iphone-Xr-black.png",
    display_resolution: "1792 х 828",
    id: "5e71d1395f168d1fb4cb3b85",
  };
  data.count = count;
  let action = setSingleProductData(data);
  let newState = shopingCartReducer(initialState, action);
  /* console.log(newState.products_in_cart_data); */
  expect(newState.products_in_cart_data.length).toBe(1);
});
