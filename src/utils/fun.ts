import { useAuthStore } from "@/store/auth";
import { ElLoading, ElMessage } from "element-plus";
import { GetMenuApi } from '@/api/common/index'

let loading;
/**
 * @functionName: 自定义封装加载
 * @params: message 加载title
 * @description: 加载动画
 * @author: wanxy420 <1335994390@qq.com>
 * @date: 2022-09-29 08:48:34
 */
export const lnLoading = (message: string = "加载中...") => {
  loading = ElLoading.service({
    lock: true,
    text: message,
    background: "rgba(0, 0, 0, 0.7)",
  });
};

/**
 * @functionName: 自定义封装加载
 * @params: message 加载title
 * @description: 加载动画
 * @author: wanxy420 <1335994390@qq.com>
 * @date: 2022-09-29 08:48:34
 */
export const lnHideLoading = () => {
  loading = ElLoading.service({
    lock: true,
    background: "rgba(0, 0, 0, 0.7)",
  });
  loading.close();
};

/**
 * @functionName: 自定义封装消息提示
 * @params: message 消息提示文字
 * @params: type 消息提示类型
 * @description: 消息提示
 * @author: wanxy420 <1335994390@qq.com>
 * @date: 2022-09-29 08:48:34
 */
export const lnMessage = (
  message: string,
  type: "success" | "warning" | "info" | "error" = 'success'
) => {
  if (type === "error") {
    ElMessage.error(message);
  } else if (type === "info") {
    ElMessage({
      message: message,
    });
  } else {
    ElMessage({
      message: message,
      type: type,
    });
  }
};

// 请求获取权限
export const getAuth = async () => {
  const authSotre = useAuthStore();
  const res = await GetMenuApi();
  if (res.code === 200) {
    authSotre.setAuthList(res.data);
  }
};


