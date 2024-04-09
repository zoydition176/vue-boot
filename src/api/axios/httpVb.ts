import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customRequestOptions, Result} from "@/api/interface/axios";
import {getToken} from "@/utils/auth";
import {ContentTypeEnum} from "@/api/enum/httpEnum";
import {httpCheckCode} from "@/api/helper/checkCode";

type httpVbAxiosConfig = InternalAxiosRequestConfig & customRequestOptions;

function tansParams(params: any) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            const params = propName + '[' + key + ']';
            const subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

export class httpVb {
  private readonly defaultConfig: AxiosRequestConfig;
  private service: AxiosInstance;
  public defaultOptions: customRequestOptions = {
    // 是否夹带token
    withToken: true,
    // 是否处理响应
    isTransformResponse: true,
    // 是否返回原生网络响应
    isReturnNativeResponse: false,
    // 是否添加前缀
    addPrefix: '',
    // about FormData
    isFormData: false,
    // add timeStamp
    joinTime: false,
    contentType: ContentTypeEnum.JSON,
    ignoreCancel: false
  };
  constructor(options: AxiosRequestConfig) {
    // 初始化axios配置
    this.defaultConfig = options;
    // 初始化axios实例
    this.service = axios.create(this.defaultConfig);
    // 设置拦截器
    this.setupInterceptors();
  }

  setupInterceptors(){
    this.service.interceptors.request.use((config: httpVbAxiosConfig)=>{
      const token = getToken();
      const { addPrefix, contentType} = config;
      const timestamp = new Date().getTime();
      if(addPrefix){
        config.url = addPrefix + '' + config.url;
      }
      config.headers["Content-Type"] = contentType;
      if(config.withToken && token && config.headers && typeof config.headers.set === "function"){
        config.headers.Authorization = token;
        config.headers.set("x-access-token", token);
        // 暂时不用加密
        config.headers.set("X-TIMESTAMP", timestamp);
        // 暂时不用加密
        config.headers.set("X-Sign", (config.url + '&' + JSON.stringify(config.params)));
      }
      // get请求映射params参数
      if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
      }
      // if (config.method === 'post' || config.method === 'put') {
      //
      // }
      console.log(config, 'config');
      return config;
    });

    this.service.interceptors.response.use((value: AxiosResponse)=>{
      return value;
    });
  }

  private transformResHook(res: AxiosResponse<Result>, opt: customRequestOptions){
    const { isTransformResponse, isReturnNativeResponse } = opt;
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
  }

  public request<T>(config: AxiosRequestConfig, customConfig: customRequestOptions): Promise<T>{
    const opt = Object.assign({}, this.defaultOptions, customConfig)
    const conf = Object.assign({}, config, opt);
    return new Promise<T>((resolve, reject)=>{
      this.service.request<any, AxiosResponse<any>>(conf).then((response: AxiosResponse<Result>)=>{
        response = this.transformResHook(response, opt);
        resolve(response as unknown as Promise<T>);
      }).catch((error)=>{
        reject(error);
      });
    })
  }

  get<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T>{
    return this.request({...config, method: 'GET'}, { ...options })
  }

  post<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T>{
    return this.request({...config, method: 'POST'}, { ...options })
  }

  delete<T = any>(config: AxiosRequestConfig, options?: customRequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, { ...options });
  }
  // blob类型下载
  blobDownload<T = any>(methods: 'GET'|'POST', config: AxiosRequestConfig, options?: customRequestOptions): Promise<T>{
    const downloadConfig: AxiosRequestConfig = Object.assign(config, {
      responseType: 'blob',
      method: methods ? methods : 'GET'
    })
    return this.request({ ...downloadConfig }, { ...options });
  }
}

export default new httpVb({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 8000,
  // 跨域时候允许携带凭证
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});

