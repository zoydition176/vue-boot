/*
* vite基础配置
* */
declare interface ViteEnv {
  // 开发环境类型
  VITE_USER_NODE_ENV: "development" | "production" | "test";
  // 应用名
  VITE_GLOB_APP_TITLE: string;
  // 端口号
  VITE_PORT: number;
  // 是否打开浏览器，顺便可以通过环境变量配置默认打开浏览器
  VITE_OPEN: boolean | string;
  // 路由模式
  VITE_ROUTER_MODE: "hash" | "history";
  // 打包后是否过滤console和debugger
  VITE_DROP_CONSOLE: boolean;
  // 公共基础路径，用于配置静态资源引用的前缀，可支持动态配置
  VITE_PUBLIC_PATH: string;
  // BaseUrl
  VITE_API_URL: string;
  // 代理配置
  VITE_PROXY: [string, string][];
}

/*
* vite插件配置
* */
declare interface ViteEnvPluginConfig extends ViteEnv {
  // vite-plugin-compression插件配置 用于项目开启gzip brotli压缩资源
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  // rollup-plugin-visualizer插件配置 用于项目资源的可视化分析
  VITE_REPORT: boolean;
  // 是否启动vite-pwa插件，据我所知pwa在项目不做seo的情况下应该没什么用
  VITE_PWA: boolean;
  // 是否启动浏览器兼容性支持
  VITE_LEGACY: boolean;
}

declare type Recordable<T = any> = Record<string, T>;
