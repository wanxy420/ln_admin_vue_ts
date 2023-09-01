import axios from 'axios';
import { ContentTypeEnum, HttpConfigInterface, ResultInterface } from './index.type'
import { useUserStore } from '@/store/user'
import { logOut } from '@/utils/fun';

enum CodeEnum {
    success = 200,
    error = 9001,
    effe = 10001,
}

//创建axios的一个实例 
const instance = axios.create({
    baseURL: '/api', //接口统一域名
    timeout: 6000, //设置超时
    headers: {
        'Content-Type': ContentTypeEnum.json,
    }
})
//请求拦截器 
instance.interceptors.request.use((config: any) => {
    const userStore = useUserStore();
    const { token } = userStore.getUserInfo;
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    token && (config.headers.token = token)
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    return config;
}, (error) =>
    // 对请求错误做些什么
    Promise.reject(error));

//响应拦截器
instance.interceptors.response.use((response) => {
    //响应成功
    console.log('响应成功');
    if (response.data.code === CodeEnum.effe) {
        logOut();
    }
    return response.data;
}, (error) => {
    console.log(error)
    //响应错误
    if (error.response && error.response.status) {
        const status = error.response.status
        console.log(status);
        return Promise.reject(error);
    }
    return Promise.reject(error);
});



/**
 * @param {String} path     请求地址
 * @param {Object} config   请求的配置
 * @returns {Promise<T>}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
function lnHttp<T>(path: string, config: HttpConfigInterface): Promise<ResultInterface<T>> {
    const { data = {}, methods = 'post', dataType = 'formdata' } = config;
    let httpConfig = {
        headers: {
            "Content-Type": dataType == 'json' ? ContentTypeEnum.json : ContentTypeEnum.formdata
        }
    };
    if (methods == 'post') {
        return instance.post(path, data, {
            ...httpConfig
        })
    } else {
        return instance.get(path, {
            params: data,
            ...httpConfig
        })
    }
};
export default lnHttp;
