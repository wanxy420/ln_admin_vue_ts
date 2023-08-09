import Mock from 'mockjs';

Mock.mock('http://127.0.0.1:5173/api/login', 'post', {
    code: 200,
    msg: '登录成功!',
    data: {
        token: 'sdgasdmad32gasdgasd3c1a3sd4g3asd4gasd1v3asg4d3',
        uid: 1
    }
});