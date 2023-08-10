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
        meta: {
            title: '登录'
        }
    },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;