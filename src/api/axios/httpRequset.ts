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
        config = requestInterceptors(config, this.options);
      }
      // 额外处理逻辑

      return config;
    }, requestInterceptorsCatch);

    // 请求拦截错误捕获
    // requestInterceptorsCatch && this.requestInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应拦截
    this.requestInstance.interceptors.response.use((response: AxiosResponse)=>{
      if (responseInterceptors) {
        response = responseInterceptors(response);
      }
      // 额外处理逻辑

      return response;
    }, responseInterceptorsCatch);

    // 响应拦截错误捕获
    // responseInterceptorsCatch && this.requestInstance.interceptors.request.use(undefined, responseInterceptorsCatch);
  }
}

