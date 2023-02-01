export interface UserLoginBody$POST {
    account: string;
    password: string;
    isMobile: boolean;
}

export interface UserLoginResponse$POST {
    id: number;
    loginStatus: number;
    phone: string;
    email: string;
    username: string;
    token: {
        sessionTimeout: number;
        tokenTimeout: number;
        tokenValue: string;
    };
}

export interface FindAccountResponse$POST {
    phone: string;
    id?: string;
    exist: boolean;
}

export interface RegisterBody$POST {
    phone: string;
    code?: string;
    password: string;
    nickName: string;
}

export interface RegisterResponse$POST {
    message: string;
    account: string;
    status: number;
}