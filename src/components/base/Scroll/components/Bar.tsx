import { BAR_MAP } from "@/constants/constants";
import React, { CSSProperties, MouseEvent, useRef, useState } from "react";

interface ScrollBarProps {
    parentRef: React.RefObject<HTMLDivElement>;
    direction: 'vertical' | 'horizontal';// 水平或垂直方向
    size: string; // 滚动条的高度/宽度
    move: string; // 滚动条移动的距离
    barStyle?: CSSProperties;
    barItemStyle?: CSSProperties;
    className?: string;
}



const Bar: React.FC<ScrollBarProps> = (props) => {
    const barClassName = `scroll-bar scrollbar-${props.direction}${props.className ? ' ' + props.className : ''}`;
    const barRef = useRef<HTMLDivElement | null>(null);
    const barProps = BAR_MAP[props.direction];
    const barItemStyle = {
        ...props.barItemStyle,
        [barProps.size]: props.size,
        [barProps.wide]: '100%',
        transform: `translate${barProps.axis}(${props.move})`
    }


    // 轨道点击定位
    const barItemRef = useRef<HTMLDivElement | null>(null);
    const handleBarMouseDown = (e: MouseEvent) => {
        const client = e[barProps.client];//点击位置距离视窗最上边或者最左边的距离
        const wrap = barRef.current!.getBoundingClientRect()[barProps.direction]; //滑轨距视窗最顶端或最左边的距离
        const offset = Math.abs(wrap - client);//点击位置距离滑轨最上或者最左边的距离
        const barItemHalf = barItemRef.current![barProps.offset] / 2;// 滑块一半的高度或宽度
        const parentRef = props.parentRef;
        const barItemPosPercent = ((offset - barItemHalf) / barRef.current![barProps.offset]) * 100; //点击滑块移动后，滑块最顶端/左端在滑轨中位置的百分比
        parentRef.current![barProps.scroll] = (barItemPosPercent * parentRef.current![barProps.scrollSize] / 100);//内容跟随滚动
    }

    // 拖拽滑块
    // const [barItemDrag, setBarItemDrag] = useState(false);
    const handleBarItemMouseDown = (e: MouseEvent) => {
        startDrag(e);
    }

    const startDrag = (e: MouseEvent) => {
        if (e.target) {
            document.addEventListener('mousemove', handleBarItemMouseMove);
            document.addEventListener('mouseup', handleBarItemMouseUp);
        }
    }
    const handleBarItemMouseMove = (e: globalThis.MouseEvent) => {
        const client = e[barProps.client];//点击位置距离视窗最上边或者最左边的距离
        const wrap = barRef.current!.getBoundingClientRect()[barProps.direction]; //滑轨距视窗最顶端或最左边的距离
        const offset = Math.abs(wrap - client!);//点击位置距离滑轨最上或者最左边的距离
        const barItemHalf = barItemRef.current![barProps.offset] / 2;// 滑块一半的高度或宽度
        const parentRef = props.parentRef;
        const barItemPosPercent = ((offset - barItemHalf) / barRef.current![barProps.offset]) * 100; //点击滑块移动后，滑块最顶端/左端在滑轨中位置的百分比
        parentRef.current![barProps.scroll] = (barItemPosPercent * parentRef.current![barProps.scrollSize] / 100);//内容跟随滚动
    }
    const handleBarItemMouseUp = (e: globalThis.MouseEvent) => {
        if (e.target) {
            document.removeEventListener('mousemove', handleBarItemMouseMove); // 注册在document上而不是event.target上是为了更流畅，为了解决鼠标滑动过快，滚动滑块跟不上，和未释放鼠标时，在滑块旁滚动的问题
            document.removeEventListener('mouseup', handleBarItemMouseUp);
        }
    }

    return (
        <div
            className={barClassName}
            ref={barRef}
            style={{ ...props.barStyle }}
            onMouseDown={handleBarMouseDown}
        >
            <div
                className="scrollbar-item"
                style={{ ...barItemStyle }}
                ref={barItemRef}
                onMouseDown={handleBarItemMouseDown}
            ></div>
        </div>
    )
}

export default Bar;