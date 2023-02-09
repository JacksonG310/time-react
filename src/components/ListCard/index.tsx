import React, { MutableRefObject, ReactNode, RefObject } from "react";
import "./index.less";

interface ListCardProps {
    header: ReactNode;
    content: ReactNode;
    footer?: ReactNode;
    ref?: any;
}

const ListCard: React.FC<ListCardProps> = React.forwardRef((props, ref: any) => {
    const { header, content, footer } = props;

    return (
        <div className="listCard" ref={ref}>
            <div className="listCardWrap">
                <div className="listCardTitle">
                    {header}
                </div>
                <div className="listCardContent">
                    {content}
                </div>
            </div>
        </div>
    )
})

export default ListCard;