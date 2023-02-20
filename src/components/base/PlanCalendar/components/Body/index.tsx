import { Scroll } from "@/components";
import { DateInfo, getCurrentMonthDays } from "@/utils/calendarUtil";
import dayjs, { Dayjs } from "dayjs";
import React, { ReactNode } from "react";
import DateCell from "../DateCell";
import "./index.less";

interface Props {
    renderTaskCell?: (value: Dayjs) => ReactNode;
    onCellClick?: (value: Dayjs) => void;
    dateData?: Dayjs
}

const Body: React.FC<Props> = (props) => {
    const dateData = getCurrentMonthDays(props.dateData || dayjs());
    const renderCell = (data: Array<DateInfo>) => {
        const cellArray: Array<ReactNode> = [];
        let item: ReactNode;
        for (let i = 0; i < 6; i++) {
            const rowData = data.slice(i * 7, (i + 1) * 7);
            item = (
                <div className="calendar-row" key={i}>
                    {
                        rowData.map(
                            (item, index) =>
                                <DateCell
                                    item={item}
                                    key={index}
                                    renderTaskCell={props.renderTaskCell}
                                    onCellClick={props.onCellClick}
                                />)
                    }
                </div>
            )
            cellArray.push(item);

        }
        return cellArray;
    }

    return (
        <div className="body-wrap">
            <Scroll
                maxWidth="100%"
                maxHeight="100%"
                width="100%"
                height="100%"
                trigger="hover"
            >
                <div className="calendar-table">
                    {
                        renderCell(dateData)
                    }
                </div>
            </Scroll>
        </div>
    )
}

export default Body;