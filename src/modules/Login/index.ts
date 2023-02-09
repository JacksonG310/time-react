import { RegisterBody$POST, UserLoginBody$POST, UserLoginResponse$POST } from "@/api/types";
import { findAccount, userLogin, userRegister } from "@/api/user";
import { RootState } from "@/types";
import { AppLocalInfo, storageUtil } from "@/utils/storage";
import { message } from "antd";
import { Module, register } from "redux-assist";
import { mainActions } from "../Main";
import LoginPage from "./main";
export interface UserInfoState {
    id: number;
    nickName: string;
    username: string;
    phone: string;
    email: string;
    token: string;
}
const userInfoState: UserInfoState = {
    id: -1,
    nickName: '',
    username: '',
    email: '',
    phone: '',
    token: ''
}
class UserModule extends Module<UserInfoState, RootState>{

    async login(body: UserLoginBody$POST) {
        const res = await userLogin(body);
        if (res.loginStatus == 1) {
            const { id, phone, email, token, username } = res;
            this.setState({
                username,
                email,
                phone,
                id,
                token: token
            })
            this.setLocalUserInfo(res);
            mainActions.initAppInfo();
            message.success("登录成功");
            return true;
        } else {
            message.error("用户名或密码错误");
            return false;
        }
    }
    setLocalUserInfo(info: UserLoginResponse$POST) {
        const { id, email, phone, token } = info;
        const userInfo: AppLocalInfo = {
            userId: id,
            email,
            phone,
            token,
        }
        storageUtil.setAppInfoToStorage(userInfo);
    }
    async findAccount(phone: string) {
        const res = await findAccount(phone);
        return res;
    }

    async userRegister(form: RegisterBody$POST) {
        const res = await userRegister(form);
        return res;
    }
}

const userAction = register(new UserModule('userInfo', userInfoState))

export { userAction, LoginPage };