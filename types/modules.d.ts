declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<Record<any, any>, Record<any, any>, any>;
  export default Component;
}