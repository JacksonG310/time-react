import { UserInfoState } from "./modules/Login"
import { MainState } from "./modules/Main";
export interface RootState {
    root: {
        userInfo: UserInfoState;
        mainModule: MainState;
    }
}