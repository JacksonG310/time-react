import { RootState } from "@/types";
import dayjs, { Dayjs } from "dayjs";
import { Module, register } from "redux-assist";
import Plan from "./Main";

export interface PlanState {
    currentDate: Dayjs;
}

const initState: PlanState = {
    currentDate: dayjs()
}

class PlanModule extends Module<PlanState, RootState>{
    changeCurrentDate(value: Dayjs) {
        this.setState({
            currentDate: value
        })
    }
}

const planAction = register(new PlanModule('planModule', initState));

export { planAction, Plan }