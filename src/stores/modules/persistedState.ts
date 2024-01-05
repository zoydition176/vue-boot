import { PersistedStateOptions } from "pinia-plugin-persistedstate"

export default function persistedOptionsConfig(key: string, paths: string[], type= localStorage) {
  const persistedConfig: PersistedStateOptions = {
    key,
    storage: type,
    paths
  }
  return persistedConfig;
}
