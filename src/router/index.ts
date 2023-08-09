import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/layouts/Login/LoginPage.vue"),
        alias: '/login',
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