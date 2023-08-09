import lnHttp from "@/axios";
import { LoginFormInterface, MenuItemInterface } from './modules/index'

// 登录接口
export function LoginApi(params: LoginFormInterface) {
    return lnHttp<any>('/admin/login', {
        methods: 'post',
        data: params
    });
}

// 请求获取菜单
export function GetMenuApi() {
    return lnHttp<MenuItemInterface[]>('/admin/login', {
        methods: 'post',
        data: {}
    });
}