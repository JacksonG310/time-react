import React, { ReactNode } from "react";
import "./index.less";
interface ScrollXProps {
    children: ReactNode;
}

const ScrollX: React.FC<ScrollXProps> = (props) => {
    return (
        <div className="scrollX">
            <div className="scroll-content">
                <div className="scroll-wrap">
                    {props.children};
                </div>
            </div>
            <div className="scroll-bar">
                <div className="scroll-bar-item"></div>
            </div>
        </div>
    )
}

export { ScrollX };