import React, { ReactNode } from "react";
import "./index.less";

interface MatterHeaderProps {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
}

const Header: React.FC<MatterHeaderProps> = (props) => {
    const { left, center, right } = props;
    return (
        <div className="header">
            <div className="header-left">{left}</div>
            <div className="header-center">{center}</div>
            <div className="header-right">{right}</div>
        </div>
    )
}

export default Header;