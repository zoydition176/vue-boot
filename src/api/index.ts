import type {AxiosTransform} from "./axios/transform";
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customAxiosRequestConfig} from "./axios/transform";

const transform: AxiosTransform = {
  // 抽象类实现
  requestInterceptors: (config: InternalAxiosRequestConfig, options: customAxiosRequestConfig) => {
    console.log(config, options, '请求拦截');
    return config;
  },
  responseInterceptors: (res: AxiosResponse<any>) => {
    console.log(res, '响应拦截');
    return res;
  },
  requestInterceptorsCatch: (error: AxiosError) => {
    console.log(error,'requestInterceptorsCatch');
    return Promise.reject(error);
  },
  responseInterceptorsCatch: (error: AxiosError) => {
    console.log(error,'responseInterceptorsCatch');
    return Promise.reject(error);
  }
}
