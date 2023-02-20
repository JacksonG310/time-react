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
    task: TaskItem[];
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

/** -------------------------------------------------------------------------------- **/
export interface AddTaskBody$POST {
    classifyId: number;
    status: number;
    importance: number;
    created: Date;
    updated: Date;
    remark: string;
    creator: number;
    from: Date;
    to: Date;
    finishStatus: number;
}

export type FindTaskResponse$GET = Array<TaskItem>;

export interface TaskItem {
    id: number;
    classifyId: number;
    status: number;
    importance: number;
    created: Date;
    updated: Date;
    remark: string;
    creator: number;
    endTime: Date;
    startTime: Date;
    finishTime: Date | null;
    finishStatus: number | null;
    title: string;
}

export interface UpdateStatusBody$POST {
    finishTime: Date | null;
    finishStatus: number | null;
    updated: Date;
    status: number;
    userId: number;
    taskId: number;
}

export interface UpdateTaskBody$PUT {
    taskId: number;
    userId: number;
    classifyId: number;
    importance: number;
    updated: Date;
    remark: string;
    title: string;
    startTime: Date;
    endTime: Date;
}