import axiosPlux, { RouteType0, RouteType1 } from '../index';

interface APIRoutes {
  fetchPosts: RouteType0;
  createUser: RouteType1;
  fetchPost: RouteType0;
  agify: RouteType0;
}

const globalRoutes = {
  agify: 'https://api.agify.io?name=:name',
};

const instanceRoutes = {
  // createUser: { path: '/users', method: 'POST' },
  fetchPosts: '/posts',
  fetchPost: '/posts/:id',
};

axiosPlux.routes = globalRoutes;

const jsonServer = axiosPlux.create<APIRoutes>({
  baseURL: 'https://jsonplaceholder.typicode.com',
  routes: instanceRoutes,
});

const jsonServerApi = jsonServer.api;

test('Response ok', () => {
  const promise = jsonServer.get('/posts').then((res) => res.status);
  return expect(promise).resolves.toBe(200);
});

test('Response not ok', () => {
  const promise = jsonServer
    .get('/posts/999999999999-404')
    .then((res) => res.status)
    .catch((err) => err.response.status);

  return expect(promise).resolves.toBe(404);
});

test('Request create post', () => {
  const promise = jsonServer
    .post('/posts', { title: 'From Axios Plux', body: '...', userId: 1 })
    .then(async (res) => res.status);

  return expect(promise).resolves.toBe(201);
});

test('Request fetch post', () => {
  const promise = jsonServerApi.fetchPost(100).then(async (res) => res.status);

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
