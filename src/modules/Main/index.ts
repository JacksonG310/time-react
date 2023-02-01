import { RootState } from "@/types";
import { Module } from "redux-assist";
import { AppLocalInfo, storageUtil } from "@/utils/storage";
import Main from "./Main";

export interface MainState {
    userInfo: AppLocalInfo | null;
    hasInitial: boolean
}

const initState: MainState = {
    userInfo: null,
    hasInitial: false
}

class MainModule extends Module<MainState, RootState> {
    init() {
        this.setState({ hasInitial: true });
    }
    initAppInfo() {
        const localAppInfo = storageUtil.getAppInfoFromStorage();
        if (localAppInfo) {
            this.setState({ userInfo: localAppInfo });
        }
        this.init();
    }
}

const mainActions = new MainModule("mainModule", initState);

export { mainActions, Main };