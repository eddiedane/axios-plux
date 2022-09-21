import axios, {
  AxiosAdapter,
  AxiosBasicCredentials,
  AxiosInstance,
  AxiosPromise,
  AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosRequestTransformer,
  AxiosResponse,
  AxiosResponseTransformer,
  CancelToken,
  Method,
  responseEncoding,
  TransitionalOptions,
} from 'axios';

type Vars = (string | number)[] | { [key: string]: any };
type Cache = boolean | number | ((arg: any) => any);

enum SpecialConfigKey {
  vars = 'vars',
  routes = 'routes',
  cache = 'cache',
}

interface SpecialConfig {
  vars?: Vars;
  cache?: Cache;
}

interface Special$Config {
  $vars?: Vars;
  $cache?: Cache;
}

interface SpecialInstanceConfig<T = Routes> extends SpecialConfig {
  routes?: T;
  $routes?: T;
}

interface RequestConfig<D = any>
  extends AxiosRequestConfig<D>,
    Request$Config,
    SpecialConfig,
    Special$Config {}

interface RequestData$Config<D = any> extends RequestConfig<D> {
  [key: string]: any;
}

interface Routes {
  [key: string]: Route | string;
}

export interface Route {
  path: string;
  method?: Method;
  params?: { [key: string]: any };
  cache?: Cache;
}

interface ObjectLiteral {
  [key: string]: any;
}

interface InstanceConfig<D = any>
  extends AxiosRequestConfig<D>,
    SpecialInstanceConfig {}

interface AxiosPluxInstance<RT = ObjectLiteral> {
  (config: RequestData$Config): AxiosPromise;
  (url: string, config?: RequestData$Config): AxiosPromise;

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: RequestConfig<D>,
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data$Config?: RequestData$Config<D>,
    config?: RequestConfig<D>,
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data$Config?: RequestData$Config<D>,
    config?: RequestConfig<D>,
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data$Config?: RequestData$Config<D>,
    config?: RequestConfig<D>,
  ): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data$Config?: RequestData$Config<D>,
    config?: RequestConfig<D>,
  ): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data$Config?: RequestData$Config<D>,
    config?: RequestConfig<D>,
  ): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data$Config?: RequestData$Config<D>,
    config?: RequestConfig<D>,
  ): Promise<R>;

  onRequest(
    interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig,
  ): void;

  onRequestError(interceptor: (err: any) => any): void;

  onResponse(interceptor: (res: AxiosResponse) => AxiosResponse): void;

  onResponseError(interceptor: (err: any) => any): void;

  axios: AxiosInstance;
  api: RT;
}

interface Request$Config<D = any> {
  $url?: string;
  $method?: Method | string;
  $baseURL?: string;
  $transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  $transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  $headers?: AxiosRequestHeaders;
  $params?: any;
  $paramsSerializer?: (params: any) => string;
  $data?: D;
  $timeout?: number;
  $timeoutErrorMessage?: string;
  $withCredentials?: boolean;
  $adapter?: AxiosAdapter;
  $auth?: AxiosBasicCredentials;
  $responseType?: ResponseType;
  $responseEncoding?: responseEncoding | string;
  $xsrfCookieName?: string;
  $xsrfHeaderName?: string;
  $onUploadProgress?: (progressEvent: any) => void;
  $onDownloadProgress?: (progressEvent: any) => void;
  $maxContentLength?: number;
  $validateStatus?: ((status: number) => boolean) | null;
  $maxBodyLength?: number;
  $maxRedirects?: number;
  $beforeRedirect?: (
    options: Record<string, any>,
    responseDetails: { headers: Record<string, string> },
  ) => void;
  $socketPath?: string | null;
  $httpAgent?: any;
  $httpsAgent?: any;
  $proxy?: AxiosProxyConfig | false;
  $cancelToken?: CancelToken;
  $decompress?: boolean;
  $transitional?: TransitionalOptions;
  $signal?: AbortSignal;
  $insecureHTTPParser?: boolean;
  $env?: {
    FormData?: new (...args: any[]) => object;
  };
}

interface ConfigParts {
  config: RequestConfig;
  special: SpecialInstanceConfig;
  data?: ObjectLiteral;
}

interface CacheStore<R> {
  responses: {
    [key: string]: {
      data: R;
      expiresAt: number;
      storedAt: number;
      waiting?: Promise<R>;
    };
  };
}

type CreateFunction = <RT>(config?: InstanceConfig) => AxiosPluxInstance<RT>;

interface AxiosPlux<RT> extends AxiosPluxInstance<RT> {
  create: CreateFunction;
  routes: Routes;
}

type MethodType0 = 'get' | 'head' | 'delete' | 'options';
type MethodType1 = 'post' | 'put' | 'patch';

export interface RouteType0 {
  <T = any, R = AxiosResponse<T>, D = any>(
    ...args: (string | number | boolean)[]
  ): Promise<AxiosResponse<T, D>>;

  <T = any, R = AxiosResponse<T>, D = any>(
    config: RequestData$Config<D>,
  ): Promise<R>;
}

export interface RouteType1 {
  <T = any, R = AxiosResponse<T>, D = any>(
    ...args: (string | number | boolean)[]
  ): Promise<R>;

  <T = any, R = AxiosResponse<T>, D = any>(
    data$Config: RequestData$Config<D>,
    config: RequestConfig<D>,
  ): Promise<R>;
}

let globalAxiosPlux: AxiosPlux<void>;

const getData$Config = (
  data$Config: RequestData$Config | FormData,
  includesData: boolean = false,
): ConfigParts => {
  const parts: ConfigParts = {
    config: {},
    special: {},
    data: {},
  };

  if (typeof window !== 'undefined' && data$Config instanceof FormData) {
    parts.data = parts.data;
    return parts;
  } else {
    data$Config = data$Config as RequestData$Config;

    for (const key in data$Config) {
      if (!key) continue;
      const value = data$Config[key];
      const is$Config = key[0] === '$';

      if (includesData && !is$Config) {
        parts.data = parts.data || {};
        parts.data[key] = value;
      } else {
        const configName = is$Config ? key.substring(1) : key;

        if (configName in SpecialConfigKey) {
          parts.special[configName as SpecialConfigKey] = value;
        } else {
          parts.config[configName as keyof RequestConfig] = value;
        }
      }
    }

    return parts;
  }
};

const resolveNamedRouteConfig = (
  url: string,
  args: any[],
): RequestData$Config => {
  let config: RequestData$Config = {};

  if (
    args[0] == null ||
    (typeof args[0] === 'object' && !Array.isArray(args[0]))
  ) {
    config = mergeConfigs(args[0] || {}, args[1]);
    if (Array.isArray(config.vars || config.$vars)) {
      if ('vars' in config)
        config.vars = getPathPlaceholders(
          url,
          config.vars as (string | number)[],
        );
      else
        config.vars = getPathPlaceholders(
          url,
          config.$vars as (string | number)[],
        );
    }
  } else {
    config = {
      vars: getPathPlaceholders(url, Array.isArray(args[0]) ? args[0] : args),
    };
  }

  return config;
};

const getPathPlaceholders = (url: string, arr: (string | number)[]) => {
  const match = url.match(/\:(\w+)/g);

  if (!match || !match.length) return {};

  return match.reduce((obj, placeholder, i) => {
    placeholder = placeholder.replace(':', '');
    const value = arr[i];
    return value === undefined ? obj : { ...obj, [placeholder]: value };
  }, {}) as ObjectLiteral;
};

const mergeConfigs = (
  config1: RequestData$Config,
  config2: RequestData$Config,
): RequestData$Config => {
  let config;
  config = { ...config1, ...config2 };
  return config;
};

const strrep = (
  str: string,
  placeholdersData: { [key: string]: any } = {},
  options = { rgx: /:(\w+)/g, valueCaptureIndex: 0 },
): string => {
  return str.replace(options.rgx, (match, ...matchData) => {
    const replacement =
      placeholdersData[matchData[options.valueCaptureIndex]] || match;

    if (replacement === match) {
      throw new Error(`"${match}" has no matching replacement value`);
    }

    return placeholdersData[matchData[options.valueCaptureIndex]] || match;
  });
};

const includes = (needle: any, haystack: any[]): boolean => {
  return haystack.findIndex((item) => item === needle) >= 0;
};

const createResolvePromise = <T = any, R = AxiosResponse<T>>(
  res: R,
): Promise<R> => {
  return new Promise((resolve) => {
    resolve(res);
  });
};

const cacheRequest = <R>(
  axiosInstance: AxiosInstance,
  config: AxiosRequestConfig,
  cacheStore: CacheStore<R>,
  memoize: Cache,
): Promise<R> => {
  const key = JSON.stringify(config);
  const storedResponse = cacheStore.responses[key];
  let expired = false;
  const onUpdate = typeof memoize === 'function' ? memoize : null;

  if (storedResponse) {
    const { expiresAt, storedAt } = storedResponse;
    if (Date.now() - storedAt >= expiresAt) expired = true;
  }

  if (!storedResponse || expired || onUpdate) {
    if (expired && storedResponse.waiting) {
      return storedResponse.waiting;
    }

    if (onUpdate && storedResponse && storedResponse.waiting) {
      return createResolvePromise(storedResponse.data);
    }

    const promise = axiosInstance(config).then((res) => {
      const storedAt = Date.now();
      const expiresAt = typeof memoize === 'number' ? memoize : 10e100;

      cacheStore.responses[key] = {
        expiresAt,
        storedAt,
        waiting: undefined,
        data: res as unknown as R,
      };

      if (onUpdate && storedResponse) onUpdate(res);

      return res;
    }) as Promise<R>;

    if (expired || (onUpdate && storedResponse)) {
      storedResponse.waiting = promise;
    }

    return onUpdate && storedResponse
      ? createResolvePromise(storedResponse.data)
      : promise;
  }

  return createResolvePromise(storedResponse.data);
};

const create = <RT = ObjectLiteral>(
  instanceConfig: InstanceConfig = {},
): AxiosPluxInstance<RT> => {
  const dataConfig = getData$Config(instanceConfig);
  const defaultConfig = dataConfig.config;
  const defaultSpecialConfig = dataConfig.special;
  const globalRoutes =
    typeof globalAxiosPlux === 'undefined' ? {} : globalAxiosPlux.routes;

  const routes = {
    ...globalRoutes,
    ...(defaultSpecialConfig.routes || {}),
  };

  const cacheStore: CacheStore<any> = { responses: {} };

  const _axios = axios.create(defaultConfig);

  const axiosPluxInstance: AxiosPluxInstance<RT> = <
    T = any,
    R = AxiosResponse<T>,
    D = any,
  >(
    url: string | RequestData$Config<D>,
    config?: RequestData$Config<D>,
  ): Promise<R> => {
    if (typeof url !== 'string') {
      config = url;
      url = config.url || config.$url || '';
    }

    return request<T, R, D>(url, config);
  };

  const api: ObjectLiteral = {};

  Object.keys(routes).forEach((routeName) => {
    const routeOrString = routes[routeName];

    let route: Route;

    if (typeof routeOrString === 'string') {
      route = { path: routeOrString };
    } else {
      route = routeOrString;
    }

    const method = route.method || 'get';

    api[routeName] = <T = any, R = AxiosResponse<T>, D = any>(
      ...args: (string | number | boolean | RequestData$Config<D>)[]
    ) => {
      const config: RequestData$Config = resolveNamedRouteConfig(
        route.path,
        args,
      );
      return request<T, R, D>(route.path, config, method);
    };
  });

  axiosPluxInstance.axios = _axios;
  axiosPluxInstance.api = api as RT;

  axiosPluxInstance.get = generateHTTPMethod0('get');
  axiosPluxInstance.head = generateHTTPMethod0('head');
  axiosPluxInstance.delete = generateHTTPMethod0('delete');
  axiosPluxInstance.options = generateHTTPMethod0('options');
  axiosPluxInstance.post = generateHTTPMethod1('post');
  axiosPluxInstance.put = generateHTTPMethod1('put');
  axiosPluxInstance.patch = generateHTTPMethod1('patch');
  axiosPluxInstance.postForm = generateHTTPMethod1('post');
  axiosPluxInstance.putForm = generateHTTPMethod1('put');
  axiosPluxInstance.patchForm = generateHTTPMethod1('patch');

  axiosPluxInstance.onRequest = (
    interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig,
  ) => {
    _axios.interceptors.request.use(interceptor, (err) => err);
  };
  axiosPluxInstance.onRequestError = (interceptor: (err: any) => any) => {
    _axios.interceptors.request.use((config) => config, interceptor);
  };
  axiosPluxInstance.onResponse = (
    interceptor: (res: AxiosResponse) => AxiosResponse,
  ) => {
    _axios.interceptors.response.use(interceptor, (err) => err);
  };
  axiosPluxInstance.onResponseError = (interceptor: (err: any) => any) => {
    _axios.interceptors.response.use(
      (res) => res,
      (err) => {
        interceptor(err);
        return Promise.reject(err);
      },
    );
  };

  return axiosPluxInstance;

  function generateHTTPMethod0(method: MethodType0) {
    return <T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data$Config: RequestConfig<D>,
    ) => {
      return request<T, R, D>(url, data$Config, method);
    };
  }

  function generateHTTPMethod1(method: MethodType1, isForm: boolean = false) {
    return <T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      data$Config: RequestData$Config<D>,
      config: RequestConfig<D>,
    ) => {
      config = mergeConfigs(data$Config, config);
      config = mergeConfigs(config, {
        headers: isForm ? { 'Content-Type': 'multipart/form-data' } : {},
      });

      return request<T, R, D>(url, config, method);
    };
  }

  function request<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data$Config: RequestData$Config<D> = {},
    method?: Method | string,
  ): Promise<R> {
    method = method || data$Config.method || data$Config.$method || 'get';
    const isMethod1 = includes(method.toLowerCase(), ['post', 'patch', 'put']);
    const configParts = getData$Config(data$Config, isMethod1);
    const config = configParts.config;
    const specialConfig = configParts.special as SpecialConfig;

    if (typeof url === 'string') {
      url = strrep(url, {
        ...defaultSpecialConfig.vars,
        ...specialConfig.vars,
      });
    }

    const fullConfig = {
      ...defaultConfig,
      ...config,
      params: { ...defaultConfig.params, ...config.params },
      data: configParts.data as D,
      method,
      url,
    };

    const requestCaching = specialConfig.cache || defaultSpecialConfig.cache;

    if (requestCaching) {
      return cacheRequest<R>(
        _axios,
        fullConfig,
        cacheStore as CacheStore<R>,
        requestCaching,
      );
    }

    const promise = _axios(fullConfig).then((res) => res) as Promise<R>;

    return promise;
  }
};

const axiosPlux = create() as AxiosPlux<void>;
globalAxiosPlux = axiosPlux;
axiosPlux.create = create;
axiosPlux.routes = {};

export default axiosPlux;
