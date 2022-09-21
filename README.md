# Axios Plux

Simply axios with some extra cool features

## Basic usage

```
import axiosPlux from 'axios-plux'

// You can still do basically normal axios stuff

axiosPlux.get(url, config)

axiosPlux.post(url, data, config)

// Instantiation
const wikipedia = axiosPlux.create(config)

// Error handling
wikipedia.onRequestError((err) => {});

// Reusable request api
const wikipediaApi = wikipedia.api

wikipediaApi.fetchArticle(1)

```

## Special Features

- API functional routes
- Url path placeholder
- Data and config consolidation (just for syntax)
- Extras: shorthands, setup, and helpers

## Routes definition

Route can be defined globally, or scoped to and axiosPlux instance and can be easily reused throughout your code

```
import axiosPlux from 'axios-plux'

// Global routes
axiosPlux.routes = {
  fetchThirdPartyData: 'http://thirdpartyapi.com'
}

// Scoped routes
const axiosPluxInstance = axiosPlux.create({
  baseUrl: 'http://localhost:8080/api/v1/',
  routes: {
    fetchTwelveUsers: {
      path: '/users',
      params: { paginationSize: 12 },
      method: 'GET'
    }
  }
})
```

Note: Scoped instances will have access to the global route

A route is an object that can be defined with 4 properties

- path: the url of the route, relative or full
- params: set a route scope url query params
- method: HTTP method for the request, defaults to "get"
- cache: enable / disable request caching

or a string as the url/path, method as GET

### Named routes

Naming route is extremely useful for portable and reusabality, and promotes consistency with url changes

Now any change made to the route e.g. url will be consistent everywhere the named route was referenced

## API functional routes

API functional routes is extremely useful for portable and reusabality, and promotes consistency with url changes are a way to both simplify request and reduce url string typos.
API route functions can only be created at a scoped instance i.e. using axiosPlux.create(config)

```
import axiosPlux from 'axios-plux'

const axiosPluxInstance = axiosPlux.create({
  routes: {
    fetchTwelveUsers: {
      path: 'http://localhost:8080/api/v1/users',
      params: {paginationSize: 12}
    },
    createNewUser: {
      method: 'post',
      path: 'http://localhost:8080/api/v1/users'
    }
  }
})
```

Now, fetchTwelveUsers and createNewUser methods will now be availble in the instance `.api` property,
and can be used as demonstrated below

```
const myApi = axiosPluxInstance.api

// get request
await myApi.fetchTwelveUsers()

// post request
await myApi.createNewUser(data)
```

## Url path placeholder

For a descriptive url with less url string manipulation,
you can add simple descriptive placeholders to url path with a colon preceeding the placeholder name
e.g. http://domain.tld/path/:placeholder/action/:id

Example

```
import axiosPlux from 'axiosPlux'

axiosPlux.delete('http://localhost:8080/users/:userId', {
  vars: {userId: 1}
})
```

API route function example

```
import axiosPlux from 'axiosPlux'

const axiosPluxInstance = axiosPlux.create({
  routes: {
    fetchUser: 'http://localhost:8080/api/v1/users/:userId/store/:storeId'
  }
})

const { api } = axiosPlux;

api.fetchUser({
  vars: {
    userId: 1,
    storeId: 2
  }
})

or

api.fetchUser(1, 2)

```

## Data and config consolidation (just for syntax)

The request config can be added to request data parameter in request methods like POST, by adding a $ sign before the config property this distiguises the data from the configs

Difference

```
import axiosPlux from 'axios-plux'

/* Consolidated */

axiosPlux.post('/users/:role', {
  firstName: 'Adam',
  lastName: 'God',
  location: 'eden',

  $headers: {
    authorization: 'whatisknowledge'
  }

  $vars: {
    role: 'admin',
  }
})

/* Seperated */

axiosPlux.post(
  '/users/:role',
  {
    firstName: 'Adam',
    lastName: 'God',
    location: 'eden',
  },
  {
    headers: {
      authorization: 'whatisknowledge'
    }

    vars: {
      role: 'admin',
    }
  }
)
```

# Extras: shorthands and helpers

## URL placeholders in functional routes

You can further simplify fuctional route request with placeholder by...

- Passing the placeholders as arguments
- Using an array instead of an object in the `config.vars`

Example

```
  import axiosPlux from 'axios-plux'

  const myStore = axiosPlux.create({
    addRouteMethods: true,
    baseURL: 'https://api.my-store.com/',
    routes: {
      fetchOrderItem: 'orders/:id/items/itemId'
    },
  })

  /* Using arguments */

  await myStore.api.fetchOrderItem(1, 2);

  /* Using config.vars as an array */

  await myStore.api.fetchOrderItem({
    vars: [1, 2]
  })

  /* Using config.vars as an object */

  await myStore.api.fetchOrderItem({
    vars: {
      id: 1,
      itemId: 2
    }
  })
```

## Interceptors helpers

There some helper methods only available on axios plux instance

```
  import axiosPlux from "axios-plux"

  const axiosPluxInstance = axiosPlux.create({})

  axiosPluxInstance.onRequest()
  axiosPluxInstance.onRequestError()
  axiosPluxInstance.onResponse()
  axiosPluxInstance.onResponseError()

```

## Access axios instance

```
import axiosPlux from "axios-plux"

const { axios } = axiosPlux

const axiosPluxInstance = axiosPlux.create({})

const { axios } = axiosPluxInstance
```

The end
