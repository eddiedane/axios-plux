import axiosPlux from "../../../../src";

const ecomApi = axiosPlux.create({
  baseUrl: "https://example.com",
  headers: {
    //...
  },

  addRouteMethods: true,
  routes: [],
});

ecomApi.onRequest = (config) => {};

ecomApi.onResponseError = (err) => {};

export default ecomApi;
