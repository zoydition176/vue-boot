import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';

class httpPendingList {
  public pendingMap: Map<string, Canceler>;

  constructor() {
    this.pendingMap = new Map<string, Canceler>();
  }

  getHttpName(config: AxiosRequestConfig) {
    return config.url + '&&' + config.method;
  }
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = this.getHttpName(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((Canceler) => {
        if (!this.pendingMap.has(url)) {
          this.pendingMap.set(url, Canceler);
        }
      });
  }
  removePending(config: AxiosRequestConfig) {
    const url = this.getHttpName(config);
    if (this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url);
      cancel && cancel(url);
      this.pendingMap.delete(url);
    }
  }
  removeAllPending() {
    this.pendingMap.forEach((func, key) => {
      key && func && func();
    });
    this.pendingMap.clear();
  }
  reset() {
    this.pendingMap = new Map<string, Canceler>();
  }
}
export const httpList = new httpPendingList();
