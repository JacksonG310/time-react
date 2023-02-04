// 接口异常处理
export class APIException {
    errmsg: string;
    errcode: number;
    constructor(info: any) {
        this.errmsg = info.message;
        this.errcode = info.code;
    }
}

// 网络异常处理
export class NetworkException<T>{
    constructor(public message: T) { };
}

// 消息异常处理
export class NotificationException<T>{
    constructor(public message: T) { };
}