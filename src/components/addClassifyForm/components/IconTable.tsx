import IconSelector from "@/components/IconSelector";
import { computedIconLayout } from "@/utils/computedIconLayout";
import React, { ReactNode } from "react";

interface Props<T> {
    CWidth: number;
    CHeihgt: number;
    IWidth: number;
    IHeight: number;
    data: Array<T>;
    tableCell: (pageData: Array<T>) => ReactNode;
    title?: string;
    iconUrl?: string;
    color?: string;
}

const IconTable = <T extends object>(props: Props<T>) => {
    const renderGroup: ReactNode[] = [];
    const { CWidth, CHeihgt, IWidth, IHeight, data, tableCell, title, iconUrl, color } = props;
    const computedRenderGroup = () => {
        const [rows, cols, pages] = computedIconLayout(CWidth, CHeihgt, IWidth, IHeight, data.length);
        const size = rows * cols;
        for (let i = 0; i < pages; i++) {
            const arr = data.slice(i * size, (i + 1) * size);
            const item = (
                <div key={i}>
                    <div className="icon-pages" style={{ width: '100%', height: `${CHeihgt}px` }}>
                        {tableCell(arr)}
                    </div>
                </div>
            )
            renderGroup.push(item);
        }
    }
    computedRenderGroup();
    return (
        <div className="icon-select">
            <div className="preview-area">
                <div className="title-text">{title}</div>
                {
                    iconUrl && color ? (
                        <div className="preview-icon" style={{ backgroundColor: color }}>
                            <img src={iconUrl} alt="" />
                        </div>
                    ) : <></>
                }
            </div>
            <IconSelector width="100%" height={CHeihgt + 'px'} renderGroup={renderGroup} />
        </div>
    )
}

export default IconTable;