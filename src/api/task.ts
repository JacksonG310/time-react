import { request } from "@/utils/http/request"
import { AddTaskBody$POST, FindTaskResponse$GET, TaskItem, UpdateStatusBody$POST } from "./types"

export const findTasks = (id: number, token: string): Promise<FindTaskResponse$GET> => {
    return request({
        method: 'get',
        url: "/findAllTask",
        query: { userId: id },
        headers: {
            'time-token': token
        }
    })
}


export const addTask = (body: AddTaskBody$POST) => {
    return request({
        method: 'post',
        url: '/addTask',
        body
    })
}

export const updateStatus = (body: UpdateStatusBody$POST) => {
    return request({
        method: 'put',
        url: '/updateStatus',
        body
    })
}

export const findTaskById = (userId: number, taskId: number): Promise<TaskItem> => {
    return request({
        method: 'get',
        url: '/findTaskById',
        query: {
            userId, taskId
        }
    })
}