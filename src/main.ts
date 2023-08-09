import { createApp } from 'vue';
import App from './App.vue';

// pinia以及数据持久化
import { createPinia } from 'pinia';
import { usePersist } from "pinia-use-persist";
const pinia = createPinia();
pinia.use(usePersist);

// 引用使用tailwind
import "./tailwind.css";

// 引用element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 引用路由
import router from './router/index';
import './router/permission';

//导入mock 无须可删除
import './mock/index';

// 自定义指令
import { auth } from "@/directive/auth";
import { scroll } from "@/directive/scroll";
import { drag } from "@/directive/drag";

const app = createApp(App);
// 引入所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(auth);
app.use(scroll);
app.use(drag);
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.mount('#app');

console.log(
    [
        "%c",
        "-----------------------------",
        "-          Wxy420           -",
        "-                           -",
        "-     1335994390@qq.com     -",
        "-                           -",
        "-----------------------------",
    ].join("\n"),
    "color:#FD802E;font-size:20px"
);