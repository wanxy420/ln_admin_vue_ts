import lnHttp from "@/axios";
import { LoginFormInterface } from './modules/index'

// 登录接口
export function LoginApi(params: LoginFormInterface) {
    return lnHttp('/admin/login', {
        methods: 'post',
        data: params
    });
}