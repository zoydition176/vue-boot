export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}
export function isStr(val: unknown): val is string {
  return typeof val === 'string';
}