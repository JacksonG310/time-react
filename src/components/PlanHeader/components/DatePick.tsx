import { planAction } from "@/modules/Plan";
import { yearMonthFormat } from "@/utils/timePickerUtil";
import { Calendar, Popover } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import "./index.less";

interface Props {
    date: Dayjs;
}

const calendarStyle: React.CSSProperties = {
    width: 300,
}

const DatePick: React.FC<Props> = (props) => {
    const { date } = props;
    const todayFormat = dayjs().format(yearMonthFormat);
    const dateFormat = date.format(yearMonthFormat);

    const changeDate = (value: Dayjs) => planAction.changeCurrentDate(value);
    const onCalendarChange = (value: Dayjs) => changeDate(value);

    return (
        <div className="date-pick">
            <div className="date-pick-btn">
                <Popover
                    trigger="click"
                    content={
                        <Calendar
                            fullscreen={false}
                            style={calendarStyle}
                            defaultValue={date}
                            onChange={onCalendarChange}
                        />
                    }>
                    <div className="yearMonth">
                        {dateFormat}
                    </div>
                </Popover>
            </div>
            {
                dateFormat !== todayFormat ? (
                    <span className="returnToday" onClick={() => changeDate(dayjs())}>今天</span>
                ) : <></>
            }
        </div>
    )
}

export default DatePick;