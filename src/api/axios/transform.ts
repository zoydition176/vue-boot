import {AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
export interface customAxiosRequestConfig extends InternalAxiosRequestConfig{
  configMethods: AxiosTransform
}
export abstract class AxiosTransform {
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: AxiosRequestConfig, options: customAxiosRequestConfig) => InternalAxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
