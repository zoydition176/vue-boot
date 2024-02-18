import { getUserStore } from "@/stores/modules/user";
import { decryptByAES } from "@/utils/cipher/crypto";

const useStore = getUserStore();

export function getToken(){
  return decryptByAES(useStore.token);
}

export function handleAsideList(list){
  return [...list];
}
