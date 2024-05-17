import { getUserStore } from '@/stores/modules/user';
import { decryptByAES } from '@/utils/cipher/crypto';
import { menuTypes } from '@/typing/base';

export function getToken() {
  const useStore = getUserStore();
  return decryptByAES(useStore.token);
}

export function handleAsideList(list: menuTypes[]): menuTypes[] {
  return [...list];
}
