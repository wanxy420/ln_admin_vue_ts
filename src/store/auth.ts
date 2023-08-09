import { defineStore } from "pinia";

interface AuthInterface {
    btnAuth: string[]
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthInterface => ({
        btnAuth: [],
    }),
    getters: {

    },
    actions: {

    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'auth',
    }
});