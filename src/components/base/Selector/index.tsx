import { ImportanceItem } from "@/constants/constants";
import { Popover, PopoverProps } from "antd"
import React, { CSSProperties, ReactNode } from "react"
import { SvgIcon } from "../SvgIcon";
import './index.less';

interface Props extends PopoverProps {
    width?: string;
    height?: string;
    circle?: boolean;
    iconWidth?: string;
    iconHeight?: string;
    iconWrapStyle?: CSSProperties;
    className?: string;
    icon: string;
    iconType?: string;
}

const Selector: React.FC<Props> = (props) => {
    const { width, height, circle, iconHeight, iconWidth, iconWrapStyle, className, icon, iconType = 'svg', ...restAttribute } = props;
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
                    {
                        iconType === 'svg' ? (
                            <SvgIcon
                                width={iconWidth ? iconWidth : '22px'}
                                height={iconHeight ? iconHeight : "22px"}
                                name={icon} />
                        ) : (
                            <img
                                width={iconWidth ? iconWidth : '22px'}
                                height={iconHeight ? iconHeight : "22px"}
                                src={icon}
                            />
                        )
                    }

                </div>
            </Popover>
        </div >
    )
}

export { Selector }