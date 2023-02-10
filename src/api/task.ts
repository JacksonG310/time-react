import { request } from "@/utils/http/request"
import { AddTaskBody$POST, FindTaskResponse$GET } from "./types"

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