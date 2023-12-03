export interface customRequestOptions {
  // // 将请求参数拼接到url
  // joinParamsToUrl?: boolean;
  // // 格式化请求参数时间
  // formatDate?: boolean;
  // // Whether to join url
  // joinPrefix?: boolean;
  // // 接口地址，如果保留为空，则使用默认值
  // apiUrl?: string;
  // // 请求拼接路径
  // urlPrefix?: string;
  // // 错误消息提示类型
  // errorMessageMode?: ErrorMessageMode;
  // // 成功消息提示类型
  // successMessageMode?: SuccessMessageMode;
  // // 是否添加时间戳
  // joinTime?: boolean;
  // ignoreCancelToken?: boolean;
  //是否在标头中发送令牌
  withToken?: boolean;
  // 是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回本地响应头,需要获取响应头时使用此属性
  isReturnNativeResponse?: boolean;
  // add prefix
  addPrefix?: string;
  // deal with formData
  isFormData?: boolean;
  // 是否添加时间戳
  joinTime?: boolean;
  contentType?: string;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}
