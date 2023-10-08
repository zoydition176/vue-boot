import {UserConfig, ConfigEnv, loadEnv} from "vite"

/**
 * @description 环境对象处理
 * @returns {UserConfig}
 * @param {ConfigEnv} mode
 * @param {string} root
 * */
export function launchEnv({ mode }: ConfigEnv, root: string):UserConfig {
    const ENV = loadEnv(mode, root);
    return {

    }
}
