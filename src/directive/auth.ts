import { App } from "vue";
import { useAuthStore } from "@/store/auth";

/**
 * @description 按钮权限限制
 * @param el 目标元素
 * @param binding 绑定对象
 * @author wanxy420 <1335994390@qq.com>
 * @date 2023-01-09 09:00:28
 */
const auth = (app: App) => {
  app.directive("lnAuth", {
    mounted(el: any, binding: any) {
      if (!app.config.globalProperties.$_has(binding.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
  app.config.globalProperties.$_has = (value: any) => {
    const authStore = useAuthStore();
    return authStore.getBtnAuth.includes(value);
  };
};

export { auth };
