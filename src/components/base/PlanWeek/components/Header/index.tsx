import { DateInfo, getCurrentDaysInWeek } from "@/utils/calendarUtil";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import HeaderCell from "../HeaderCell";
import "./index.less";

interface Props {
    dateData: Array<DateInfo>;
}

const WeekHeader: React.FC<Props> = (props) => {
    const { dateData } = props;
    return (
        <div className="week-header">
            {
                dateData.map((item, index) => (
                    <HeaderCell key={index} item={item} />
                ))
            }
        </div>
    )
}

export default WeekHeader;