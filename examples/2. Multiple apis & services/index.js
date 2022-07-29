import ecomApi from "./api/ecommerce";
import mapApi from "./api/map";
import weatherApi from "./api/weather";

ecomApi
  .fetProducts()
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err.response));

mapApi
  .fetchRegion()
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err.response));

weatherApi
  .fetchStats()
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err.response));
