import axiosPlux from "../../../src";

import categories from "./resources/categories";
import orders from "./resources/orders";
import products from "./resources/products";
import users from "./resources/users";

const storeApi = axiosPlux.create({
  baseUrl: "https://example.com",
  headers: {
    //...
  },

  addRouteMethods: true,
  routes: [...categories, ...orders, ...products, ...users],
});

storeApi.onRequest = (config) => {};

storeApi.onResponseError = (err) => {};

export default storeApi;
