import { defineStore } from "pinia";

interface UserInterface extends LoginInfoInterface {

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
    }),
    getters: {
        getLoginInfo: (state: UserInterface) => {
            return {
                username: state.username,
                password: state.password,
                checked: state.checked,
            }
        },
    },
    actions: {
        handleLoginInfo(info: LoginInfoInterface) {
            this.checked = info.checked;
            if (info.checked === 'true') {
                this.username = info.username;
                this.password = info.password;
            } else {
                this.username = '';
                this.password = '';
            }

        }
    },
    // 数据持久化配置
    persist: {
        enabled: true,
        // 可删除
        encryptionKey: 'user',
    }
});