import { request } from "@/utils/http/request";
import { UserLoginQuery$POST, UserLoginResponse$POST } from "./types";

export const userLogin = (query: UserLoginQuery$POST): Promise<UserLoginResponse$POST> => {
    return request({
        method: "post",
        url: "/login",
        query,
    })
}