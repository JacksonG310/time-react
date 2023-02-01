import React from "react";

interface SvgIconProps {
    name: string;
    width?: string;
    height?: string;
    color?: string;
    className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = (props) => {
    const { name, width, height, color, className } = props;
    const symbolId = `#icon-${name}`;
    const extraClass = className ? ` ${className}` : '';
    return (
        <svg className={`time-svg-icon${extraClass}`} width={width} height={height} >
            <use xlinkHref={symbolId} fill={color}></use>
        </svg>
    )
}

export { SvgIcon };