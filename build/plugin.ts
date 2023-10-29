import {PluginOption} from "vite";
// vite--vue模版自带插件 提供 Vue 3 单文件组件支持
import vue from "@vitejs/plugin-vue";
// vite--vue jsx插件 提供 Vue 3 JSX 支持
import vueJsx from '@vitejs/plugin-vue-jsx';
// setup命名插件
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
// 可压缩html并在html中渲染指定变量的插件
import { createHtmlPlugin } from "vite-plugin-html";
// vite本地开发请求优化
import VitePluginCertificate from 'vite-plugin-mkcert';
// vite项目资源的可视化分析
import { visualizer } from "rollup-plugin-visualizer";
// 组件内svg支持
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// vite传统浏览器兼容支持
import legacy from '@vitejs/plugin-legacy';
// vite打包压缩配置
import {configCompressPlugin} from "./compress";
// 优化vite首次加载速度
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
// node模块解析
import {resolve} from "path";

/*
* vite插件配置的导入
* */
export function createVitePlugins(viteEnv: ViteEnvPluginConfig, isBuild: boolean){
  const {VITE_GLOB_APP_TITLE,VITE_REPORT, VITE_LEGACY, VITE_BUILD_COMPRESS,VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE} = viteEnv;
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    vueSetupExtend(),

    // @ts-ignore
    VitePluginCertificate({
      source: 'coding',
    }),
    createHtmlPlugin({
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    VITE_REPORT && (visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true }) as PluginOption)
  ];
  if(isBuild){
    VITE_LEGACY && vitePlugins.push(legacy());
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));
  }
  vitePlugins.push(PkgConfig());
  vitePlugins.push(OptimizationPersist());
  return vitePlugins;
}
