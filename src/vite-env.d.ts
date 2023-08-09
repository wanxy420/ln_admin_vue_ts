interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;        // 项目名称
    readonly VITE_APP_LOGO: string;         // 项目LOGO
    readonly VITE_NODE_ENV: string;         // 指定构建模式
    readonly VITE_APP_PORT: string;         // 项目启动端口
    readonly VITE_APP_HOST: string;         // 项目启动IP
    readonly VITE_APP_SERVER_OPEN: boolean; // 服务启动时是否自动打开项目
    readonly VITE_RES_URL: string;          // 接口域名或IP
    readonly VITE_LOGIN_PATH: string;       // 登录页地址
    readonly VITE_HOME_PATH: string;        // 首页地址
    readonly VITE_RUN_PATH: string;         // 默认启动地址
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}