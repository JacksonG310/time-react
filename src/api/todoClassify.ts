import { request } from "@/utils/http/request"
import { AddTagBody$POST, FindTagsResponse$GET, UpdateTagTitle$PUT } from "./types"

export const findTags = (id: number, token: string): Promise<FindTagsResponse$GET> => {
    return request({
        method: 'get',
        url: "/findTags",
        query: { userId: id },
        headers: {
            'time-token': token
        }
    })
}

export const addTag = (body: AddTagBody$POST, token: string) => {
    return request({
        method: 'post',
        url: '/addTag',
        body,
        headers: {
            'time-token': token
        }
    })
}

export const updateTagTitle = (body: UpdateTagTitle$PUT, token: string) => {
    return request({
        method: 'put',
        url: '/updateTagTitle',
        body,
        headers: {
            'time-token': token
        }
    })
}