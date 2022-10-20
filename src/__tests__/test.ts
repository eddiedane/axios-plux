import axiosPlux, { RouteType0, RouteType1 } from '../index';

interface APIRoutes {
  fetchUsers: RouteType0;
  createUser: RouteType1;
  fetchUser: RouteType0;
  agify: RouteType0;
}

const globalRoutes = {
  agify: 'https://api.agify.io?name=:name',
};

const instanceRoutes = {
  // createUser: { path: '/users', method: 'POST' },
  fetchUsers: '/users',
  fetchUser: '/users/:id',
};

axiosPlux.routes = globalRoutes;

const key = '83e7e2e891094e13905a92f35c2e2118';

const jsonServer = axiosPlux.create<APIRoutes>({
  baseURL: 'https://crudcrud.com/api/' + key,
  routes: instanceRoutes,
});

const jsonServerApi = jsonServer.api;

test('Response ok', () => {
  const promise = jsonServer.get('/posts').then((res) => res.status);
  return expect(promise).resolves.toBe(200);
});

test('Response not ok', () => {
  const promise = jsonServer
    .get('/posts/99999999')
    .then((res) => res.status)
    .catch((err) => err.response.status);

  return expect(promise).resolves.toBe(404);
});

test('Request url with vars', () => {
  const promise = jsonServer
    .post('/users', { firstName: 'John', lastName: 'Doe' })
    .then(async (res) => {
      return jsonServerApi.fetchUser(res.data._id).then((res) => res.status);
    });

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
