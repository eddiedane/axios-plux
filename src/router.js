const router = (base = "/", routes = []) => {
  return routes.map((route) => ({ ...route, path: base + route.path }));
};

module.exports = router;
