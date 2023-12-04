import type {AxiosTransform} from "./axios/transform";
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customAxiosRequestConfig} from "./axios/transform";
import {httpRequest} from "/@/api/axios/httpRequset";
// import {getUserStore} from "/@/stores/modules/user";
import {AxiosRequestConfig} from "axios";
import {customRequestOptions, Result} from "/@/api/interface/axios";
import {ContentTypeEnum, RequestEnum, ResultEnum} from "@/api/enum/httpEnum";
import {isStr} from "@/utils/affirm/is";
import {getToken} from "@/utils/auth";
// import {customResponseOptions} from "/@/api/interface/axios";
// import {customResponseOptions} from "/@/api/interface/axios";

function httpCheckError(code = 500, msg = ''){
  let context = '';
  switch (code) {
    case ResultEnum.ERROR:
      context = '请求失败了';
      break;
    case ResultEnum.TIMEOUT:
      context = '请求超时了';
      // 退出登录逻辑
      break;
    default:
      if(msg){
        context = msg;
      }
  }
  throw new Error(context || 'this request\'s message does not exist');
}

// 抽象类实现
const transform: AxiosTransform = {
  // before set requestInterceptors
  beforeReqHook: (config: AxiosRequestConfig, options: customRequestOptions) => {
    console.log(config,options,'beforeReqHook');
    const { addPrefix, joinTime } = options;
    const timestamp = new Date().getTime();
    if(addPrefix){
      config.url = addPrefix + '' + config.url;
    }
    const params = config.params || {};
    const data = config.data || false;
    // get方法加入时间戳
    if(config.method?.toUpperCase() === RequestEnum.GET){
      if(isStr(params)){
        // restful style
        config.params = joinTime ? `${config.url}${params}${timestamp}` : `${config.url}${params}`;
        config.params = undefined;
      }else{
        config.params = Object.assign(params || {}, joinTime ? { _t: timestamp } : {});
      }
    }else{
      if(isStr(params)){
        // restful style
        config.params = joinTime ? `${config.url}${params}${timestamp}` : `${config.url}${params}`;
        config.params = undefined;
      }else{
        if(Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0){
          config.data = data;
          config.params = params;
        }else{
          config.data = params;
          config.params = undefined;
        }
      }
    }
    return config;
  },
  /**
   * @description: 请求拦截配置
   * @params config axios配置（带headers）
   * @params options 自定义配置
   */
  requestInterceptors: (config: InternalAxiosRequestConfig, options: customAxiosRequestConfig) => {
    console.log(config, options, '请求拦截');
    const token = getToken();
    const contentType = options.requestOption?.contentType;
    if(contentType){
      config.headers.set("Content-Type", contentType);
    }else{
      config.headers.set("Content-Type", ContentTypeEnum.JSON);
    }
    // 自定义配置逻辑需要加在customAxiosRequestConfig这个接口里面
    if (options.requestOption?.withToken && token && config.headers && typeof config.headers.set === "function") {
      config.headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;

      config.headers.set("x-access-token", token);

      // 暂时不用加密
      config.headers.set("X-TIMESTAMP", token + new Date().getTime());

      // 暂时不用加密
      config.headers.set("X-Sign", (config.url + '' + JSON.stringify(config.params)));

    }
    return config;
  },
  // 具体的逻辑看需求，后期逐步添加
  responseInterceptors: (res: AxiosResponse<any>) => {
    console.log(res, '响应拦截');
    return res;
  },
  // after response interceptor
  transformResHook: (res: AxiosResponse<Result>, options: customRequestOptions) => {
    console.log(res,options,'transformResHook');
    const { isTransformResponse, isReturnNativeResponse } = options;
    if(isReturnNativeResponse){
      return res;
    }
    if (!isTransformResponse) {
      return res.data;
    }
    const { data } = res;
    if(!data){
      throw new Error('request no data');
    }
    const { code, result, message, success } = data;
    if(!result){
      throw new Error('后端格式不对！');
    }
    if(code === ResultEnum.SUCCESS){
      return result;
    }

    success && message && console.log(message, 'response message');
    httpCheckError(code, message);
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
    console.log(response, code, message, 'responseInterceptorsCatch');
    return Promise.reject(error);
  }
}

// 定义默认请求配置
export default new httpRequest({
  authenticationScheme: '',
  configMethods: transform,
  baseURL: import.meta.env.VITE_API_URL as string,
  requestOption: {
    // 是否夹带token
    withToken: true,
    // 是否处理响应
    isTransformResponse: true,
    // 是否返回原生网络响应
    isReturnNativeResponse: false,
    // 是否添加前缀
    // addPrefix: '',
    // about FormData
    isFormData: false,
    // add timeStamp
    joinTime: true,
    contentType: ContentTypeEnum.JSON
  }
});
