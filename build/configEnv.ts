// 重新处理vite配置中的字符串，主要是因为很多人对env文件的处理习惯不一样，有的在配置文件对字符串打引号，有的又习惯在配置文件里面不打引号。导致类型无法被直接推断。
// 并且现在对env文件的支持不够，不能像yml文件那样方便做配置，所以用这个方法统一env文件编辑后的格式
export function wrapperEnv(envConf: Recordable): ViteEnvPluginConfig {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}
