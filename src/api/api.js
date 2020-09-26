import axios from "axios";

const instance = axios.create({
  baseURL: "https://pacific-depths-36780.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const NavigationApi = {
  getNavLinks() {
    return instance.get(`navigations`);
  },
};
export const HomeApi = {
  getPromoItems() {
    return instance.get(`promos`);
  },
  getCategories() {
    return instance.get("categories");
  },
  getArticles() {
    return instance.get("articles");
  },
};
export const ProductApi = {
  getProducts(slug, currentPage = 1, perPage = 3, params) {
    return instance.get(`${slug}/?page=${currentPage}&_limit=${perPage}&${params}`);
  },
  getProductsWithParams(slug, params) {
    return instance.get(`${slug}/?${params}`);
  },
  getFilterItems(slug) {
    return instance.get(`${slug}/filter`);
  },
  getSingleProduct(slug, id) {
    return instance.get(`/${slug}/${id}`);
  },
  postOrderData(orderData) {
    return instance.post("/orders", orderData);
  },
};
