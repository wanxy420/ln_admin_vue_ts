import { defineStore } from "pinia";
import { MenuItemInterface } from '@/api/common/modules/index'

interface AuthInterface {
    btnAuth: string[]
    authList: MenuItemInterface[]
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthInterface => ({
        btnAuth: [],
        authList: []
    }),
    getters: {

    },
    actions: {
        setAuthList(list: MenuItemInterface[]) {
            this.authList = list;
        }
    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'auth',
    }
});