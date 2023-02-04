import { RootState } from "@/types";
import { Module, register } from "redux-assist";
import Issue from "./Main";

export interface MatterState {
    addFormVisible: boolean;
}
const initState: MatterState = {
    addFormVisible: false
}

class MatterModule extends Module<MatterState, RootState>{
    changleAddFormVisible(value: boolean) {
        this.setState({
            addFormVisible: value
        })
    }
}

const matterActions = register(new MatterModule('matterModule', initState));
export { matterActions, Issue }