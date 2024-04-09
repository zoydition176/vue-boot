import type {AxiosTransform} from "./axios/transform";
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customAxiosRequestConfig} from "./axios/transform";
import {httpRequest} from "/@/api/axios/httpRequset";
import {AxiosRequestConfig} from "axios";
import {customRequestOptions, Result} from "/@/api/interface/axios";
import {ContentTypeEnum, RequestEnum} from "@/api/enum/httpEnum";
import {isStr} from "@/utils/affirm/is";
import {getToken} from "@/utils/auth";
import {httpCheckCode} from "@/api/helper/checkCode";
/*
* 抽象类实现，按整个http请求的顺序定义方法
* 已经废弃，问题出在data赋值
* */
const transform: AxiosTransform = {
  // before set requestInterceptors
  beforeReqHook: (config: AxiosRequestConfig, options: customRequestOptions) => {
    console.log(config, options, 'beforeReqHook');
    const { addPrefix, joinTime } = options;
    const timestamp = new Date().getTime();
    if(addPrefix){
      config.url = addPrefix + '' + config.url;
    }
    /*
    * 这一段 有几把大问题 直接导致老子请求配置和默认配置出现问题。
    * 这里axios应该有个默认的逻辑，不设置params/data就他妈指定不了headers，post方法全你妈报错了。
    * 但如果设置了params/data就不能改动contentType，所有的上传方法都没法用。
    * */
    /* 有毒代码开始 */
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
    /* 有毒代码结束 */
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
    console.log(token, "token");
    const contentType = options.requestOption?.contentType;
    console.log(contentType, "contentTypecontentType");
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
    console.log(config, "asdaszzzz");
    return config;
  },
  // 具体的逻辑看需求，后期逐步添加
  responseInterceptors: (res: AxiosResponse<any>) => {
    console.log(res, '响应拦截');
    return res;
  },
  // after response interceptor
  transformResHook: (res: AxiosResponse<Result>, options: customRequestOptions) => {
    console.log(res, options, 'transformResHook');
    const { isTransformResponse, isReturnNativeResponse } = options;
    if(isReturnNativeResponse){
      return res;
    }
    if (!isTransformResponse) {
      return res.data;
    }
    const { code, data, message, type } = res.data;
    if(httpCheckCode(code, message)){
      if(!data){
        throw new Error('后端数据为空！');
      }else{
        return data;
      }
    }
    type === 'success' && message && console.log(message, 'response message');
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
    console.log(error, response, code, message, 'responseInterceptorsCatch');
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
    joinTime: false,
    contentType: ContentTypeEnum.JSON,
    ignoreCancel: false
  }
});
