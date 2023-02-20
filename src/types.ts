import { UserInfoState } from "./modules/Login"
import { MainState } from "./modules/Main";
import { MatterState } from "./modules/Matter";
import { PlanState } from "./modules/Plan";
export interface RootState {
    root: {
        userInfo: UserInfoState;
        mainModule: MainState;
        matterModule: MatterState;
        planModule: PlanState;
    }
}