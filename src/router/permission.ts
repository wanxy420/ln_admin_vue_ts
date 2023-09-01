import router from "./index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useAuthStore } from '@/store/auth'
import { getAuth } from "@/utils/fun";
import { MenuItemInterface } from '@/api/common/modules/index'


// 页面白名单
const whitePath = [import.meta.env.VITE_LOGIN_PATH];
// 清除缓存名单
const clearPaht = [import.meta.env.VITE_LOGIN_PATH, import.meta.env.VITE_HOME_PATH];

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
    // 判断是否添加到tags中，在首页显示页面的tags
    if (clearPaht.includes(to.fullPath as string)) {
        authSotre.clearTagsList();
    }
    if (to.meta.isTabs) {
        authSotre.setTagsList({
            label: to.meta.title as string,
            path: to.path,
            isKeepAlive: to.meta.isKeepAlive as boolean,
            name: to.name as string
        });
    };
    // 判断是否是首次打开，如是添加动态权限
    if (!router.hasRoute('Home') && !whitePath.includes(to.fullPath as string)) {
        await getAuth();
        await getRouters();
        return next({ ...to, replace: true });
    }
    if (to.fullPath === import.meta.env.VITE_HOME_PATH) {
        let toPaht = getFirstMenu(authSotre.getAuthList);
        return next({ path: toPaht });
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
            name: 'Home',
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

// 获取首个打开的菜单
function getFirstMenu(data: MenuItemInterface[]) {
    if (Array.isArray(data[0].children) && data[0].children.length > 0) {
        return getFirstMenu(data[0].children);
    }
    return data[0].path;
};