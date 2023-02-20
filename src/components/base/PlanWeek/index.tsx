import { getCurrentDaysInWeek } from "@/utils/calendarUtil";
import dayjs, { Dayjs } from "dayjs";
import React, { ReactNode } from "react";
import WeekBody from "./components/Body";
import WeekHeader from "./components/Header";
import "./index.less";

interface Props {
    currentDate?: Dayjs;
    renderCell?: (value: Dayjs) => ReactNode;
}
const PlanWeek: React.FC<Props> = (props) => {
    const { currentDate, renderCell } = props;
    const dateData = getCurrentDaysInWeek(currentDate || dayjs());
    return (
        <div className="plan-week">
            <div className="plan-week-wrap">
                <div className="plan-week-header">
                    <WeekHeader dateData={dateData} />
                </div>
                <div className="plan-week-body">
                    <WeekBody dateData={dateData} renderTaskCell={renderCell} />
                </div>
            </div>
        </div>
    )
}


export default PlanWeek;
