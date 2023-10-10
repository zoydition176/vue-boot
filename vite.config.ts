import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {wrapperEnv} from "./build/configEnv";
import {resolve} from "path";
import {createProxy} from "./build/proxy";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // 获取文件目录
  const root = process.cwd();
  console.log(root, "adress");
  // 加载vite配置
  const env = loadEnv(mode,root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_OPEN } = viteEnv;
  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    root,
    // 转译设置，定义别名
    resolve: {
      alias: {
        '@': resolve(__dirname, "./src"),
      }
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: VITE_OPEN,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY)
    }
  }
})
