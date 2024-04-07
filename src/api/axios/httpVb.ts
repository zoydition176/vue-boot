import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {customRequestOptions} from "@/api/interface/axios";

interface httpVbAxiosConfig extends InternalAxiosRequestConfig {
  authenticationScheme?: string;
  customConfig?: customRequestOptions;
}

export class httpVb {
  private defaultConfig: AxiosRequestConfig;
  private service: AxiosInstance;
  constructor(options: AxiosRequestConfig) {
    // 初始化axios配置
    this.defaultConfig = options;
    // 初始化axios实例
    this.service = axios.create(options);
    // 设置拦截器
    this.setupInterceptors();
  }

  setupInterceptors(){
    this.service.interceptors.request.use((config: httpVbAxiosConfig)=>{
      return config;
    });

    this.service.interceptors.response.use((value: AxiosResponse)=>{
      return value;
    });
  }

  public request<T>(config, customConfig): Promise<T>{

    return new Promise<T>((resolve, reject)=>{
      this.service.request<any, AxiosResponse<any>>(config).then(()=>{

      }).catch(()=>{

      });
    })
  }

  public get<T = any>(config: AxiosRequestConfig, options: httpVbAxiosConfig): Promise<T>{
    return this.request({...config, method: 'GET'}, {...options})
  }

  public post<T = any>(config: AxiosRequestConfig, options: httpVbAxiosConfig): Promise<T>{
    return this.request({...config, method: 'POST'}, {...options})
  }
}

// http.get({url: url, ...data}:AxiosRequestConfig, { a: 'a', b: 'b'}:httpVbAxiosConfig)

export default new httpVb({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 8000,
  // 跨域时候允许携带凭证
  withCredentials: true
});

