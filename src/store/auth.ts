import { defineStore } from "pinia";
import { MenuItemInterface } from '@/api/common/modules/index';

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
        clearTagsList() {
            this.tagsList = [];
        },
        clearBtnAuth() {
            this.btnAuth = [];
        },
        clearAuthList() {
            this.authList = [];
        },
        logOut() {
            this.clearTagsList();
            this.clearBtnAuth();
            this.clearAuthList();
        },
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
        },
        closeTagsData(type: 'left' | 'right' | 'other', path: string) {
            // 获取下标
            let index = this.tagsList.findIndex(x => x.path === path);
            switch (type) {
                case 'left':
                    this.tagsList.splice(0, index);
                    break;
                case 'right':
                    this.tagsList.splice(index + 1, this.tagsList.length);
                    break;
                case 'other':
                    this.tagsList = [this.tagsList[index]];
                    break;
                default:
                    // 防止多加了类型报错提示
                    let defaultType: never = type;
                    console.log(defaultType);
                    break;
            }
        },
    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'auth'
    }
});