// 接口请求类型枚举
export enum ContentTypeEnum {
    'json' = 'application/json',
    'formdata' = 'multipart/form-data',
};

export interface ResultInterface<T> {
    code: number;
    msg: string;
    data: T
};

export interface HttpConfigInterface {
    // 请求方式
    methods?: 'post' | 'get';

    // 请求参数
    data?: any;

    // 请求数据类型
    dataType?: 'json' | 'formdata';
};