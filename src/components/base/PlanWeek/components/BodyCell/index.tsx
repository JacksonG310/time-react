import { Scroll } from "@/components";
import { DateInfo } from "@/utils/calendarUtil";
import { Dayjs } from "dayjs";
import React, { ReactNode } from "react";
import "./index.less";

interface Props {
    index: number;
    item: Dayjs;
    renderTaskCell?: (value: Dayjs) => ReactNode;
}

const BodyCell: React.FC<Props> = (props) => {
    const { index, item, renderTaskCell } = props;
    return (
        <div className="body-cell" style={{ background: index % 2 == 1 ? '#f1f1f2' : '#fff' }}>
            <div className="cell-wrap">
                <div className="cell-content">
                    <Scroll
                        maxHeight="100%"
                        maxWidth="100%"
                        height="100%"
                        width="100%"
                        trigger="none"
                        hBarItemStyle={{ display: 'none' }}
                        vBarItemStyle={{ display: 'none' }}
                    >
                        {renderTaskCell && renderTaskCell(item)}
                    </Scroll>
                </div>
            </div>
        </div>
    )
}

export default BodyCell;