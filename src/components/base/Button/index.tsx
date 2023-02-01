import React, { ButtonHTMLAttributes } from "react";
import { SvgIcon } from "../SvgIcon";
import "./index.less"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    icon?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, icon, ...restAttribute } = props;

    return (
        <React.Fragment>
            <button className="time-button-component" {...restAttribute}>
                <div className="button-content">
                    {children}
                    {icon ? <SvgIcon name={icon} className="button-icon" color="rgba(75, 162, 243, .8)" /> : null}
                </div>
            </button>
        </React.Fragment>
    )
}

export { Button };