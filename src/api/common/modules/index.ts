export interface LoginFormInterface {
    username: string;
    password: string;
};

export interface MenuItemInterface {
    id: number,
    name: string,
    path: string,
    component: string,
    icon: string,
    label: string,
    isMenu: boolean,
    isKeepAlive: boolean,
    children: MenuItemInterface[]
}