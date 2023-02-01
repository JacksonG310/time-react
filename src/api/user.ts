import { request } from "@/utils/http/request";
import { FindAccountResponse$POST, RegisterBody$POST, RegisterResponse$POST, UserLoginBody$POST, UserLoginResponse$POST } from "./types";

export const userLogin = (body: UserLoginBody$POST): Promise<UserLoginResponse$POST> => {
    return request({
        method: "post",
        url: "/login",
        body,
    })
}

export const findAccount = (phone: string): Promise<FindAccountResponse$POST> => {
    return request({
        method: "post",
        url: "/findAccount",
        body: {
            phone
        }
    })
}

export const userRegister = (body: RegisterBody$POST): Promise<RegisterResponse$POST> => {
    return request({
        method: "post",
        url: "/register",
        body
    })
}