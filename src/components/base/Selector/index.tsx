import { Popover, PopoverProps } from "antd"
import React, { CSSProperties, ReactNode } from "react"
import { SvgIcon } from "../SvgIcon"

interface Props extends PopoverProps {
    width?: string;
    height?: string;
    circle?: boolean;
    icon: string;
    iconWidth?: string;
    iconHeight?: string;
    iconWrapStyle?: CSSProperties;
    className?: string;
}

const Selector: React.FC<Props> = (props) => {
    const { width, height, circle, icon, iconHeight, iconWidth, iconWrapStyle, className, ...restAttribute } = props;
    const selectorClass = `iconSelector${className ? ' ' + className : ''}`;
    const seletorStyle: CSSProperties = {
        width: width || '32px',
        height: height || '32px',
        borderRadius: `${circle ? '50%' : ''}`
    }
    return (
        <div className={selectorClass} style={seletorStyle}>
            <Popover {...restAttribute}>
                <div className="selectorIcon" style={iconWrapStyle}>
                    <SvgIcon
                        width={iconWidth ? iconWidth : '22px'}
                        height={iconHeight ? iconHeight : "22px"}
                        name={icon} />
                </div>
            </Popover>
        </div >
    )
}

export { Selector }