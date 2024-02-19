import { getUserStore } from "@/stores/modules/user";
import { decryptByAES } from "@/utils/cipher/crypto";
import {menuTypes} from "@/typing/base";

const useStore = getUserStore();

export function getToken(){
  return decryptByAES(useStore.token);
}

export function handleAsideList(list :menuTypes[]): menuTypes[]{
  return [...list];
}
