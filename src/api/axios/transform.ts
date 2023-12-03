import {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customRequestOptions} from "/@/api/interface/axios";
export interface customAxiosRequestConfig extends AxiosRequestConfig{
  authenticationScheme?: string;
  configMethods?: AxiosTransform;
  requestOption?: customRequestOptions;
}
export abstract class AxiosTransform {
  /**
   * @description: 请求前处理
   */
  beforeReqHook?: (config: AxiosRequestConfig, options: customRequestOptions) => AxiosRequestConfig;
  /**
   * @description: 响应后处理
   */
  transformResHook?: (res: AxiosResponse<any>, options: customRequestOptions) => any;
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: InternalAxiosRequestConfig, options: customAxiosRequestConfig) => InternalAxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: AxiosError) => Promise<any>;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: AxiosError) => Promise<any>;
}
