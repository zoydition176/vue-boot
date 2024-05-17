import type { ProxyOptions } from 'vite'
// 代理对象 [被替换值，替换值]
// type 定义一个类型别名，写起来比较方便
type ProxyItem = [string, string]
type ProxyList = ProxyItem[]
type ProxyTableList = Record<string, ProxyOptions>

const httpsReg = /^https:\/\//
/*
 * 生成代理对象
 * */
export function createProxy(list: ProxyList = []) {
  const result: ProxyTableList = {}
  for (const [prefix, target] of list) {
    result[prefix] = {
      target: target,
      ws: true,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(httpsReg.test(target) ? { secure: false } : {}),
    }
  }
  return result
}
