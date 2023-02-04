import { UserInfoState } from "./modules/Login"
import { MainState } from "./modules/Main";
import { MatterState } from "./modules/Matter";
export interface RootState {
    root: {
        userInfo: UserInfoState;
        mainModule: MainState;
        matterModule: MatterState;
    }
}