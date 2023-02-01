import { request } from "@/utils/http/request"

export const findTags = (id: number) => {
    request({
        method: 'get',
        url: "/findTags",
        query: { id },
    })
}