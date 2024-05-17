import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

export default function persistedOptionsConfig(key: string, type = localStorage, paths?: string[]) {
  const persistedConfig: PersistedStateOptions = {
    key,
    storage: type,
    paths,
  };
  return persistedConfig;
}
