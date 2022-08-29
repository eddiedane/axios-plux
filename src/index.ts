import axios from "axios";
import {
  AxiosPluxInstanceConfig,
  AxiosPluxRequestConfig,
  AxiosPluxRequestData$Config,
  SpecialConfig,
  SpecialConfigKey,
} from "./types";

const create = (config: AxiosPluxInstanceConfig) => {};

const getData$Config = (
  data$Config: AxiosPluxRequestData$Config | FormData,
  includesData: boolean = false
) => {
  if (typeof window !== "undefined" && data$Config instanceof FormData) {
    return { data: data$Config, $config: {}, $special: {} };
  } else {
    data$Config = data$Config as AxiosPluxRequestData$Config;

    const parts: {
      config: AxiosPluxRequestConfig;
      special: SpecialConfig;
      data?: { [key: string]: any };
    } = {
      config: {},
      special: {},
    };

    if (includesData) parts.data = {};

    for (const key in data$Config) {
      const value = data$Config[key];
      const is$Config = key[0] === "$";

      if (includesData && !is$Config) {
        parts.data = parts.data || {};
        parts.data[key] = value;
      } else {
        const configName = is$Config ? key.substring(1) : key;

        if (configName in SpecialConfigKey) {
          parts.special[configName as SpecialConfigKey] = value;
        } else {
          parts.config[configName as keyof AxiosPluxRequestConfig] = value;
        }
      }
    }

    return parts;
  }
};
