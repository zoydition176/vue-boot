import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { customAxiosRequestConfig } from '/@/api/axios/transform';
import { customRequestOptions } from '/@/api/interface/axios';
import { cloneD } from '/@/utils';
import { isFunction } from '/@/utils/affirm/is';
import { httpList } from '@/api/axios/httpPendingList';

/*
 * 请求类封装
 * 已废弃，问题出在data赋值
 * 已废弃，问题出在data赋值
 * 已废弃，问题出在data赋值
 * 已废弃，问题出在data赋值
 * 已废弃，问题出在data赋值
 * 已废弃，问题出在data赋值
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

  private setupInterceptors() {
    const configMethods = this.getConfigMethods();
    if (!configMethods) return;
    // init http list to filter repeated request
    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
      configMethods;
    // 请求拦截
    this.requestInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const ignoreCancel = this.options.requestOption?.ignoreCancel;
      const checkOpt: customAxiosRequestConfig = Object.assign({}, this.options, config);
      !ignoreCancel && httpList.addPending(config);
      if (requestInterceptors) {
        // 通过this.options中的自定义配置，更改config配置里的值
        config = requestInterceptors(config, checkOpt);
      }
      // 额外处理逻辑

      return config;
    }, requestInterceptorsCatch);

    // 响应拦截
    this.requestInstance.interceptors.response.use((response: AxiosResponse) => {
      response && httpList.removePending(response.config);
      if (responseInterceptors) {
        response = responseInterceptors(response);
      }
      // 额外处理逻辑

      return response;
    }, responseInterceptorsCatch);
  }
  /**
   * @params config axios原生配置+默认配置
   * @params options 封装后实时的自定义请求配置
   */
  originRequest<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T> {
    let conf: customAxiosRequestConfig = cloneD(config);
    const configMethods = this.getConfigMethods() || {};
    const { beforeReqHook, transformResHook } = configMethods;
    // 获取提前配置设定的默认配置
    const { requestOption } = this.options;
    // 合并成新配置
    const newOptions = Object.assign({}, requestOption, options);
    // 重新处理请求
    if (beforeReqHook && isFunction(beforeReqHook)) {
      conf = beforeReqHook(conf, newOptions);
    }
    conf.requestOption = newOptions;

    return new Promise((resolve, reject) => {
      this.requestInstance
        .request<any, AxiosResponse<any>>(conf)
        .then((result) => {
          if (transformResHook && isFunction(transformResHook)) {
            try {
              const newRes = transformResHook(result, newOptions);
              /*if(config.success){
              config.success(result.data);
            }*/
              resolve(newRes);
            } catch (err) {
              reject(err || new Error('request fail'));
            }
            return;
          }
          resolve(new Promise(() => {}));
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
          return;
        });
    });
  }
  // AxiosRequestConfig：原生配置  customRequestOptions：自定义配置
  get<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T> {
    return this.originRequest({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T> {
    return this.originRequest({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T> {
    return this.originRequest({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T> {
    return this.originRequest({ ...config, method: 'DELETE' }, options);
  }
  // blob类型下载
  blobDownload<T = any>(
    methods: 'GET' | 'POST',
    config: AxiosRequestConfig,
    options?: customRequestOptions
  ): Promise<T> {
    const downloadConfig: AxiosRequestConfig = Object.assign(config, {
      responseType: 'blob',
      method: methods ? methods : 'GET',
    });
    return this.originRequest({ ...downloadConfig }, options);
  }

  // upload<T = any>(methods: 'GET'|'POST', config: AxiosRequestConfig, options?: customRequestOptions): Promise<T> {
  //   return this.this.requestInstance.request()
  // }
}
