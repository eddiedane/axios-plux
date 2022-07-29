import axiosPlux from "../../../../src";

const mapApi = axiosPlux.create({
  baseUrl: "https://example.com",
  headers: {
    //...
  },

  addRouteMethods: true,
  routes: [],
});

mapApi.onRequest = (config) => {};

mapApi.onResponseError = (err) => {};

export default mapApi;
