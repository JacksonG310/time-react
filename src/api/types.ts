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
    // token: {
    //     sessionTimeout: number;
    //     tokenTimeout: number;
    //     tokenValue: string;
    // };
    token: string;
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


/** -------------------------------------------------------------------------------- **/
export interface FindTagsResponse$GET {
    userId: number;
    tags: Array<TagItem>;
}

export interface TagItem {
    id: number;
    name: string;
    color: string;
    iconUrl: string;
}

export interface AddTagBody$POST {
    tagId: number;
    title: string;
    creatorId: number;
    color: string;
    iconId: string;
}

export interface UpdateTagTitle$PUT {
    tagId: number;
    title: string;
}