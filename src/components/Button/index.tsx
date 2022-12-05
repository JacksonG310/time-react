import React from "react";
import { SvgIcon } from "../SvgIcon";
import "./index.less"

interface ButtonProps {
    children?: React.ReactNode;
    icon?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, icon } = props;

    return (
        <React.Fragment>
            <button className="time-button-component">
                <div className="button-content">
                    {children}
                    {icon ? <SvgIcon name={icon} className="button-icon" color="rgba(75, 162, 243, .8)" /> : null}
                </div>
            </button>
        </React.Fragment>
    )
}

export { Button };