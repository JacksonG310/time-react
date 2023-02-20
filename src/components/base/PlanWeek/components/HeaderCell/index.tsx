import { SvgIcon } from "@/components";
import { WEEK_MAP } from "@/constants/constants";
import { DateInfo } from "@/utils/calendarUtil";
import { dateFormat } from "@/utils/timePickerUtil";
import dayjs from "dayjs";
import React from "react";
import "./index.less";
interface Props {
    item?: DateInfo;
}
const HeaderCell: React.FC<Props> = (props) => {
    const { item } = props;
    const today = dayjs().format(dateFormat);
    const isToday = item?.dateDayJS.format(dateFormat) === today;
    return (
        <div className="header-cell">
            <div className="cell-wrap">
                <div className="dateInfo" >
                    <span className="dateValue"
                        style={{ color: isToday ? '#64befe' : '' }}
                    >
                        {item?.dateValue}
                    </span>
                    <span
                        className="dateDay"
                        style={{ color: isToday ? '#64befe' : '' }}
                    >
                        {isToday ? '今天' : WEEK_MAP[item?.dateDay || 0]}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HeaderCell;