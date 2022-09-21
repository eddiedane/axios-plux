import axiosPlux, { RouteType0 } from '../index';

interface APIRoutes {
  fetchUsers: RouteType0;
  fetchUser: RouteType0;
  agify: RouteType0;
}

const globalRoutes = {
  agify: 'https://api.agify.io?name=:name',
};

const instanceRoutes = {
  fetchUsers: '/users',
  fetchUser: '/users/:id',
};

axiosPlux.routes = globalRoutes;

const jsonServer = axiosPlux.create<APIRoutes>({
  baseURL: 'http://localhost:3000',
  routes: instanceRoutes,
});

const jsonServerApi = jsonServer.api;

test('Response ok', () => {
  const promise = jsonServer.get('/about').then((res) => res.status);
  return expect(promise).resolves.toBe(200);
});

test('Response not ok', () => {
  const promise = jsonServer
    .get('/404')
    .then((res) => res.status)
    .catch((err) => err.response.status);

  return expect(promise).resolves.toBe(404);
});

test('Request url with vars', () => {
  const promise = jsonServerApi.fetchUser(1).then((res) => res.status);
  return expect(promise).resolves.toBe(200);
});

test('Instance api', () => {
  const definedRoutesNames = Object.keys({
    ...globalRoutes,
    ...instanceRoutes,
  });

  const apiRoutesNames = Object.keys(jsonServerApi);

  const definedRoutesInApi = definedRoutesNames.every((routeName) =>
    apiRoutesNames.includes(routeName),
  );

  expect(definedRoutesInApi).toBeTruthy();

  const apiRoutesCallable = definedRoutesNames.every((routeName) => {
    return jsonServerApi[routeName as keyof APIRoutes] instanceof Function;
  });

  expect(apiRoutesCallable).toBeTruthy();
});
