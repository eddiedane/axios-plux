import storeApi from "./api";

storeApi
  .fetchCategories()
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err.response));
