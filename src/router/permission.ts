import router from "./index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useAuthStore } from '@/store/auth'
import { getAuth } from "@/utils/fun";
import { MenuItemInterface } from '@/api/common/modules/index'

let isFirstOpen = true;

// 页面白名单
const whitePath = ['login'];
const viteComponent = import.meta.glob("../views/**/*.vue");

NProgress.configure({
    easing: "ease",
    speed: 500,
    showSpinner: true,
    trickleSpeed: 200,
    minimum: 0.3,
});

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
    const authSotre = useAuthStore();
    NProgress.start();
    // 判断是否是首次打开，如是添加动态权限
    if (isFirstOpen && !whitePath.includes(to.name as string)) {
        // 判断是否存储了权限
        if (authSotre.getAuthList.length === 0 || !Array.isArray(authSotre.getAuthList)) {
            await getAuth();
        }
        await getRouters();
        isFirstOpen = false;
        return next({ ...to, replace: true });
    }
    document.title = to.meta.title as string;
    return next();
});

// 路由后置守卫
router.afterEach(() => {
    NProgress.done();
});

// 处理动态权限
const getRouters = () => {
    return new Promise((resolve) => {
        const authSotre = useAuthStore();
        // 处理路由数据
        let data = handlerRouterDate(authSotre.authList);
        let children: any[] = [];
        // 添加路由
        data.forEach((item: any) => {
            children.push(item)
        });
        let homeRoute = {
            path: import.meta.env.VITE_HOME_PATH,
            name: 'home',
            component: () => import("../layouts/Home/HomePage.vue"),
            meta: {
                title: '首页'
            },
            children: children
        };
        router.addRoute(homeRoute);
        // 返回成功
        resolve(true);
    });
};

// 处理路由数据
const handlerRouterDate = (data: any) => {
    let routerData = <any>[];
    data.forEach((item: any) => {
        if (item.children) {
            let temp = handlerRouterDate(item.children);
            temp.forEach((sub: any) => {
                if (sub.path != "-") {
                    routerData.push(sub);
                }
            });
        }
        if (item.path != "-") {
            routerData.push(handlerRouterItem(item));
        }
    });

    return routerData;
};

// 处理单个路由数据
const handlerRouterItem = (item: MenuItemInterface) => {
    return {
        name: item.name,
        path: item.path,
        component: viteComponent[`../views${item.component}.vue`],
        meta: {
            keepAlive: item.isKeepAlive,
            isTabs: item.isMenu,
            title: item.label,
        },
    };
};