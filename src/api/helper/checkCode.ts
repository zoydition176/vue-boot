import {getUserStore} from "@/stores/modules/user";
import {ResultEnum} from "@/api/enum/httpEnum";
import {ElMessage} from "element-plus";

export function httpCheckCode(code="500", msg = ''){
  let context = '';
  const userStore = getUserStore();
  switch (code) {
    case ResultEnum.SUCCESS:
      context = '请求成功';
      return true;
    case ResultEnum.ERROR:
      context = '请求失败';
      break;
    case ResultEnum.TIMEOUT:
      context = '请求超时';
      // 退出登录逻辑
      break;
    case ResultEnum.TOKEN_FAIL:
      context = "token验证失败，请重新登录";
      ElMessage.error(context);
      userStore.userLogout();
      break;
    default:
      if(msg){
        context = msg;
      }
      ElMessage.error(context);
      break;
  }
  return false;
}
