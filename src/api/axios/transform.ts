import {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customRequestOptions, customResponseOptions} from "/@/api/interface/axios";
export interface customAxiosRequestConfig extends AxiosRequestConfig{
  configMethods: AxiosTransform,
  requestOption?: customRequestOptions,
  responseOption?: customResponseOptions
}
export abstract class AxiosTransform {
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: InternalAxiosRequestConfig, options: customAxiosRequestConfig) => InternalAxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>, options: customAxiosRequestConfig) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: AxiosError) => Promise<any>;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: AxiosError) => Promise<any>;
}
