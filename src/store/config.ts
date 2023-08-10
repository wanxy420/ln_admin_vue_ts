import { defineStore } from "pinia";

interface ConfigInterface {
    isMobile: boolean
};

export const useConfigStore = defineStore('config', {
    state: (): ConfigInterface => ({
        isMobile: false
    }),
    getters: {
        getIsMobile: (state: ConfigInterface) => state.isMobile,
    },
    actions: {
        // 修改判断是否为手机端
        setIsMobile(bol: boolean) {
            this.isMobile = bol;
        }
    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'config'
    }
});