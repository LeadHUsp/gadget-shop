import axios from "axios";

const instance = axios.create({
  baseURL: "https://pacific-depths-36780.herokuapp.com/"
});

export const NavigationApi = {
  getNavLinks() {
    return instance.get(`navigations`);
  }
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
  }
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
  }
};

/* export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  follow(userId) {
    return instance.post(`follow/${userId}`, null);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  }
};

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`);
  },
  getStatus(id) {
    return instance.get(`profile/status/${id}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: `${status}` });
  }
};
export const AuthAPI = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logOut() {
    return instance.delete(`auth/login`);
  }
}; */
