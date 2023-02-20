import React, { ReactNode } from "react";
import "./index.less";
import CalendarHeader from "./components/Header";
import CalendarBody from "./components/Body";
import { Dayjs } from "dayjs";

interface Props {
    renderCell?: (value: Dayjs) => ReactNode;
    onCellClick?: (value: Dayjs) => void;
    date?: Dayjs;
}

const PlanCalendar: React.FC<Props> = (props) => {
    const handleClick = () => {
    }
    return (
        <div className="plan-calendar" onClick={handleClick}>
            <div className="plan-calendar-wrap">
                <div className="plan-calendar-header">
                    <CalendarHeader />
                </div>
                <div className="plan-calendar-body">
                    <CalendarBody
                        renderTaskCell={props.renderCell}
                        onCellClick={props.onCellClick}
                        dateData={props.date}
                    />
                </div>
            </div>
        </div>
    )
}

export { PlanCalendar }