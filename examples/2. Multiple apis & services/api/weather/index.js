import axiosPlux from "../../../../src";

const weatherApi = axiosPlux.create({
  baseUrl: "https://example.com",
  headers: {
    //...
  },

  addRouteMethods: true,
  routes: [],
});

weatherApi.onRequest = (config) => {};

weatherApi.onResponseError = (err) => {};

export default weatherApi;
