import type { ProxyOptions } from 'vite';
// 代理对象 [被替换值，替换值]
type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargetList = Record<string, ProxyOptions>;
/*
* 生成代理对象
* */
export function createProxy(list: ProxyList){
  const result: ProxyTargetList = {};
  for(let [prefix,target] of list){

  }
  return result;
}
