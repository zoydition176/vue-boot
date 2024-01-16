export function isFunction(val: unknown) {
  return typeof val === 'function';
}
export function isStr(val: unknown) {
  return typeof val === 'string';
}
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}
