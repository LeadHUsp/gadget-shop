import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337",
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
    return instance.get(
      `${slug}/?page=${currentPage}&_limit=${perPage}${params}`
    );
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
};
