import router from "./index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 页面白名单
const whitePath = ['login', 'chat'];

const viteComponent = import.meta.glob("../views/**/*.vue");

NProgress.configure({
    easing: "ease",
    speed: 500,
    showSpinner: true,
    trickleSpeed: 200,
    minimum: 0.3,
});

// 路由前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    return next();
});

// 路由后置守卫
router.afterEach(() => {
    NProgress.done();
});