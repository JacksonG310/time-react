import { DateInfo } from "@/utils/calendarUtil";
import { Dayjs } from "dayjs";
import React, { ReactNode } from "react";
import BodyCell from "../BodyCell";
import "./index.less";
interface Props {
    dateData: Array<DateInfo>;
    renderTaskCell?: (value: Dayjs) => ReactNode;
}
const WeekBody: React.FC<Props> = (props) => {
    const { dateData, renderTaskCell } = props;
    return (
        <div className="week-body">
            {
                dateData.map((item, index) => {
                    return (
                        <BodyCell key={index} item={item.dateDayJS} index={index} renderTaskCell={renderTaskCell} />
                    )
                })
            }
        </div>
    )
}

export default WeekBody;