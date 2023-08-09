import Mock from 'mockjs';
import menu from './menu.json'

// 登录
Mock.mock('http://127.0.0.1:5173/admin/login', 'post', {
    code: 200,
    msg: '登录成功!',
    data: {
        token: 'sdgasdmad32gasdgasd3c1a3sd4g3asd4gasd1v3asg4d3',
        uid: 1
    }
});

// 获取权限
Mock.mock('http://127.0.0.1:5173/admin/getMenu', 'get', {
    code: 200,
    msg: '请求成功!',
    data: menu
});