import type {AxiosTransform} from "./axios/transform";
const config: AxiosTransform = {
  requestInterceptors: () => {},
  responseInterceptors: () => {},
  requestInterceptorsCatch: () => {},
  responseInterceptorsCatch: () => {}
}
