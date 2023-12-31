import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: import.meta.env.VITE_RUN_PATH
    },
    {
        path: import.meta.env.VITE_LOGIN_PATH,
        name: 'Login',
        component: () => import("@/layouts/Login/LoginPage.vue"),
        meta: {
            title: '登录'
        }
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/layouts/Error/index.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;