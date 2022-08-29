import {
  AxiosAdapter,
  AxiosBasicCredentials,
  AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosRequestTransformer,
  AxiosResponseTransformer,
  CancelToken,
  Method,
  responseEncoding,
  TransitionalOptions,
} from "axios";

export interface AxiosRequest$Config<D = any> {
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
    responseDetails: { headers: Record<string, string> }
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

export interface AxiosPluxRequestConfig
  extends AxiosRequestConfig,
    AxiosRequest$Config {}

export interface AxiosPluxRequestData$Config extends AxiosPluxRequestConfig {
  [key: string]: any;
}

export interface AxiosPluxInstanceConfig
  extends AxiosRequestConfig,
    SpecialInstanceConfig {}

export enum SpecialConfigKey {
  vars = "vars",
  routes = "routes",
  addRouteMethod = "addRouteMethod",
  cache = "cache",
}

enum Special$ConfigKey {
  $vars = "$vars",
  $routes = "$routes",
  $addRouteMethod = "$addRouteMethod",
  $cache = "$cache",
}

interface SpecialRequestConfig {
  [SpecialConfigKey.vars]?: { [key: string]: any };
  [SpecialConfigKey.cache]?: boolean | number | Function;
}

interface SpecialRequest$Config {
  [Special$ConfigKey.$vars]?: { [key: string]: any };
  [Special$ConfigKey.$cache]?: boolean | number | Function;
}

export interface Route {
  path: string;
  name?: string;
  method?: Method;
}

interface SpecialInstanceConfig {
  [SpecialConfigKey.routes]?: Route[];
  [SpecialConfigKey.addRouteMethod]?: boolean;
}

interface SpecialInstance$Config {
  [Special$ConfigKey.$routes]?: Route[];
  [Special$ConfigKey.$addRouteMethod]?: boolean;
}

export interface SpecialConfig
  extends SpecialRequestConfig,
    SpecialRequest$Config,
    SpecialInstanceConfig,
    SpecialInstance$Config {}
