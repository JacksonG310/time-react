import { Scroll } from "@/components/base/Scroll";
import { DateInfo } from "@/utils/calendarUtil";
import dayjs, { Dayjs } from "dayjs";
import React, { ReactNode } from "react";
import "./index.less";

interface Props {
    item?: DateInfo;
    renderTaskCell?: (value: Dayjs) => ReactNode;
    onCellClick?: (value: Dayjs) => void;
}

const DateCell: React.FC<Props> = (props) => {
    const { renderTaskCell, item, onCellClick } = props;
    return (
        <div className="date-cell" onClick={() => onCellClick && onCellClick(item!.dateDayJS)}>
            <div className="date-cell-wrap">
                <div className="cell-header" style={{
                    color: item!.dateDayJS.diff(dayjs().add(-1, 'day')) < 0 ? '#bdbdbd' : ''
                }}>
                    <span className="date-value">
                        {item!.dateValue}
                    </span>
                </div>
                <div className="cell-body">
                    <Scroll
                        trigger="none"
                        maxHeight="100%"
                        maxWidth="100%"
                        width="100%"
                        height="100%"
                        vBarItemStyle={{ display: 'none' }}
                    >
                        {renderTaskCell && renderTaskCell(item!.dateDayJS)}
                    </Scroll>
                </div>
            </div>
        </div >
    )
}

export default DateCell;