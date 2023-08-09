import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: import.meta.env.VITE_RUN_PATH
    },
    {
        path: import.meta.env.VITE_LOGIN_PATH,
        name: 'login',
        component: () => import("@/layouts/Login/LoginPage.vue"),
        alias: import.meta.env.VITE_LOGIN_PATH,
        meta: {
            title: '登录'
        }
    },
    {
        path: import.meta.env.VITE_HOME_PATH,
        name: 'home',
        component: () => import("@/layouts/Home/HomePage.vue"),
        alias: import.meta.env.VITE_HOME_PATH,
        meta: {
            title: '首页'
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;