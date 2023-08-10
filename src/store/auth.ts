import { defineStore } from "pinia";
import { MenuItemInterface } from '@/api/common/modules/index'

interface AuthInterface {
    // 按钮权限
    btnAuth: string[],
    // 权限列表
    authList: MenuItemInterface[],
    // 已打开的页面
    tagsList: TagsInterface[],
}

interface TagsInterface {
    label: string,
    path: string,
    name: string,
    isKeepAlive: boolean,
};

export const useAuthStore = defineStore('auth', {
    state: (): AuthInterface => ({
        btnAuth: [],
        authList: [],
        tagsList: []
    }),
    getters: {
        getAuthList: (state: AuthInterface) => state.authList,
        getBtnAuth: (state: AuthInterface) => state.btnAuth,
        getTagsList: (state: AuthInterface) => state.tagsList,
    },
    actions: {
        setAuthList(list: MenuItemInterface[]) {
            this.authList = list;
        },
        setBtnAuth(list: string[]) {
            this.btnAuth = list;
        },
        setTagsList({ label, path, name, isKeepAlive }: TagsInterface) {
            if (!(this.tagsList.findIndex(x => x.path === path) >= 0)) {
                this.tagsList.push({
                    label: label,
                    path: path,
                    name: name,
                    isKeepAlive: isKeepAlive,
                })
            }
        },
        delTags(index: number) {
            this.tagsList.splice(index, 1);
        }
    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'auth'
    }
});