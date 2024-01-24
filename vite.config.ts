import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite';
import {wrapperEnv} from "./build/configEnv";
import {resolve} from "path";
// import {path} from "path"
import {createProxy} from "./build/proxy";
import {createVitePlugins} from "./build/plugin";
import {OUTPUT_DIR} from "./build/static";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // 获取文件目录
  const root = process.cwd();
  console.log("项目文件目录：", root);
  // 加载vite配置
  const env = loadEnv(mode,root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_OPEN } = viteEnv;
  const isBuild = command === 'build';
  console.log(createProxy(VITE_PROXY),'createProxy(VITE_PROXY)');
  return {
    base: VITE_PUBLIC_PATH,
    root,
    // 转译设置
    resolve: {
      alias: {
        '@': resolve(__dirname, "./src"),
        '#': resolve(__dirname, "./types"),
        '/@': resolve(__dirname, "./src"),
      }
    },
    // css公共引入配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/main.scss";`
        }
      }
    },
    // 服务器配置
    server: {
      // 监听所有端口
      host: '0.0.0.0',
      // 关闭TLS + HTTP/2
      https: false,
      port: VITE_PORT,
      open: VITE_OPEN,
      // 允许跨域
      cors: true,
      // 代理配置列表
      proxy: createProxy(VITE_PROXY)
      // proxy: {
      //   '^/api': {
      //     target: 'http://localhost:9090',
      //     changeOrigin: true, //开启代理
      //     ws: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    // 构建配置
    build: {
      minify: 'esbuild',
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // minify模式改为terser时可打开，能去掉console和debugger 但是打包速度会降低
      /*terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: true,
        },
      },*/
      // Turning off brotliSize display can slightly reduce packaging time
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  }
});
