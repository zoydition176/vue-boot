import type {AxiosTransform} from "./axios/transform";
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customAxiosRequestConfig} from "./axios/transform";
import {httpRequest} from "/@/api/axios/httpRequset";
import {getUserStore} from "/@/stores/modules/user";
import {AxiosRequestConfig} from "axios";
import {customRequestOptions} from "/@/api/interface/axios";
// import {customResponseOptions} from "/@/api/interface/axios";
// import {customResponseOptions} from "/@/api/interface/axios";

// 抽象类实现
const transform: AxiosTransform = {
  beforeReqHook: (config: AxiosRequestConfig, options: customRequestOptions) => {
    console.log(config,options,'beforeReqHook');
    return config;
  },
  transformResHook: (res: AxiosResponse<any>, options: customRequestOptions) => {
    console.log(res,options,'transformResHook');
    return res;
  },
  /**
   * @description: 请求拦截配置
   * @params config axios配置（带headers）
   * @params options 自定义配置
   */
  requestInterceptors: (config: InternalAxiosRequestConfig, options: customAxiosRequestConfig) => {
    console.log(config, options, '请求拦截');
    const userStore = getUserStore();
    const token = userStore.token;
    // 自定义配置逻辑需要加在customAxiosRequestConfig这个接口里面
    if (options.requestOption?.withToken && token && config.headers && typeof config.headers.set === "function") {
      config.headers.set("x-access-token", token);
    }
    return config;
  },
  // 具体的逻辑看需求，后期逐步添加
  responseInterceptors: (res: AxiosResponse<any>) => {
    console.log(res, '响应拦截');
    return res;
  },
  // 具体的逻辑看需求，后期逐步添加
  requestInterceptorsCatch: (error: AxiosError) => {
    console.log(error,'requestInterceptorsCatch');
    return Promise.reject(error);
  },
  // 具体的逻辑看需求，后期逐步添加
  responseInterceptorsCatch: (error: AxiosError) => {
    const { response, code, message } = error;
    console.log(response, code, message);
    return Promise.reject(error);
  }
}

// 定义默认请求配置
export default new httpRequest({
  configMethods: transform,
  requestOption: {
    withToken: true,
    isTransformResponse: true,
    isReturnNativeResponse: false,
  }
});
