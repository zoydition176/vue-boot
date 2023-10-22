import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customAxiosRequestConfig} from "/@/api/axios/transform";

/*
* 请求类封装
* */
export class httpRequest {
  // axios实例
  private requestInstance: AxiosInstance;
  // axios自定义配置实例
  private readonly options: customAxiosRequestConfig;
  constructor(options: customAxiosRequestConfig) {
    // 初始化axios自定义配置
    this.options = options;
    // 初始化axios实例
    this.requestInstance = axios.create(options);
    // 设置拦截器
    this.setupInterceptors();
  }

  // 获取拦截方法
  private getConfigMethods() {
    const { configMethods } = this.options;
    return configMethods;
  }

  private setupInterceptors(){
    const configMethods = this.getConfigMethods();
    if(!configMethods) return;
    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = configMethods;
    // 请求拦截
    this.requestInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if(requestInterceptors){
        // 通过this.options中的自定义配置，更改config配置里的值
        config = requestInterceptors(config, this.options);
      }
      // 额外处理逻辑

      return config;
    }, requestInterceptorsCatch);

    // 响应拦截
    this.requestInstance.interceptors.response.use((response: AxiosResponse)=>{
      if (responseInterceptors) {
        response = responseInterceptors(response, this.options);
      }
      // 额外处理逻辑

      return response;
    }, responseInterceptorsCatch);
  }

  get<T = any>(url: string, params?: object, config = {}): Promise<T>{
    return this.requestInstance.get(url, {params, ...config});
  }

  post<T = any>(url: string, data?: object, config = {}): Promise<T>{
    return this.requestInstance.post(url, data, {...config});
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.requestInstance.delete(url, { params, ..._object });
  }

  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.requestInstance.put(url, params, _object);
  }

  // 需要重新封装
  download(){
    return Promise.reject();
  }
}

