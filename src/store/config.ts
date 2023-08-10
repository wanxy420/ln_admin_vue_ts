import { defineStore } from "pinia";

interface ConfigInterface {
    isMobile: boolean,
    isCollapse: boolean,
};

export const useConfigStore = defineStore('config', {
    state: (): ConfigInterface => ({
        isMobile: false,
        isCollapse: true
    }),
    getters: {
        getIsMobile: (state: ConfigInterface) => state.isMobile,
        getIsCollapse: (state: ConfigInterface) => state.isCollapse,
    },
    actions: {
        // 修改判断是否为手机端
        setIsMobile(bol: boolean) {
            this.isMobile = bol;
        },
        // 修改是否展示菜单
        setIsCollapse(bol: boolean) {
            this.isCollapse = bol;
        }
    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'config'
    }
});