import { defineStore } from "pinia";

interface UserInterface extends LoginInfoInterface {
    token: string;
    uid: number;
};

interface LoginInfoInterface {
    username: string;
    password: string;
    checked: string;
}

export const useUserStore = defineStore('user', {
    state: (): UserInterface => ({
        username: '',
        password: '',
        checked: 'false',
        token: '',
        uid: 0
    }),
    getters: {
        // 获取登录信息
        getLoginInfo: (state: UserInterface) => {
            return {
                username: state.username,
                password: state.password,
                checked: state.checked,
            }
        },
        // 获取登录成功用户信息
        getUserInfo: (state: UserInterface) => {
            return {
                token: state.token,
                uid: state.uid
            }
        }
    },
    actions: {
        // 存储登录信息
        handleLoginInfo(info: LoginInfoInterface) {
            this.checked = info.checked;
            if (info.checked === 'true') {
                this.username = info.username;
                this.password = info.password;
            } else {
                this.username = '';
                this.password = '';
            }

        },
        // 存储登录用户信息
        handleUserInfo(token: string, uid: number) {
            this.token = token;
            this.uid = uid;
        }
    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'user',
    }
});