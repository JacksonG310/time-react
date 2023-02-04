import { addResizeListener, ElementObj, removeResizeListener } from "@/utils/resizeListener";
import React, { CSSProperties, MouseEvent, ReactNode, Ref, UIEvent, useCallback, useEffect, useRef, useState } from "react";
import Bar from "./components/Bar";
import "./index.less";
interface ScrollProps {
    width: string;
    height: string;
    maxHeight: string;
    maxWidth: string;
    trigger: 'hover' | 'alaways' | 'none';//触发滚动条显示的条件（hover、always、none）           
    noresize?: boolean;
    direction?: 'all' | 'x' | 'y';// 水平或垂直方向
    vBarStyle?: CSSProperties;
    hBarStyle?: CSSProperties;
    vBarItemStyle?: CSSProperties;
    hBarItemStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    children?: ReactNode;
    onScroll?: (e: any) => void;
}

const Scroll: React.FC<ScrollProps> = (props) => {
    const { width, height, maxHeight, maxWidth, direction = "all", contentStyle } = props;

    const scrollClass = `scroll scroll-${props.trigger}`;
    const scrollWrapClass = `scroll-wrap scroll-wrap-${direction}`;
    const scrollStyle: CSSProperties = {
        width,
        height,
        maxWidth,
        maxHeight
    }
    const scrollWrapStyle: CSSProperties = {
        maxWidth,
        maxHeight
    }

    const wrapRef = useRef<HTMLDivElement>(null);

    const [barDisplay, setBarDisplay] = useState({
        hasVBar: false,
        hasHBar: false
    });
    const [scrollState, setScrollState] = useState({
        vBarItemHeight: '10%',
        hBarItemWidth: '10%',
        moveX: '0%',
        moveY: '0%',
        hover: false
    })

    // 计算滚动条高度
    const computedBarSize = () => {
        if (wrapRef.current) {
            const heightPercentage = wrapRef.current.clientHeight / wrapRef.current.scrollHeight * 100;
            const widthPercentage = wrapRef.current.clientWidth / wrapRef.current.scrollWidth * 100;

            let hasVBar = false;
            let hasHBar = false;
            if (heightPercentage < 100) {
                hasVBar = true;
            } else {
                hasVBar = false;
            }
            if (widthPercentage < 100) {
                hasHBar = true;
            } else {
                hasHBar = false;
            }
            const vBarItemHeight = heightPercentage < 100 ? `${heightPercentage}%` : '';
            const hBarItemWidth = widthPercentage < 100 ? `${widthPercentage}%` : '';

            setBarDisplay({
                hasHBar,
                hasVBar
            })
            setScrollState({
                ...scrollState,
                vBarItemHeight,
                hBarItemWidth
            })
        }
    }

    // 真实滚动条滚动时，barItem跟随滚动
    const handleScroll = (e: any) => {
        const { scrollTop, clientHeight, scrollLeft, clientWidth } = e.target;
        const moveY = `${scrollTop / clientHeight * 100}%`;
        const moveX = `${scrollLeft / clientWidth * 100}%`;
        setScrollState({
            ...scrollState,
            moveX,
            moveY
        })
        props.onScroll && props.onScroll(e);
    }

    const setScrollTop = (value: number) => {
        wrapRef.current!.scrollTop = value;
    }

    const setScrollLeft = (value: number) => {
        wrapRef.current!.scrollLeft = value;
    }
    useEffect(() => {
        computedBarSize();
        // if (!props.noresize) {
        //     addResizeListener(wrapRef.current! as any, computedBarSize); // 监听元素变化，如果容器DOM变化触发更新
        // }
        // return () => {
        //     if (!props.noresize) {
        //         removeResizeListener(wrapRef.current as any, computedBarSize);
        //     }
        // }
    }, [])
    return (
        <div className={scrollClass} style={scrollStyle}>
            <div className={scrollWrapClass} style={scrollWrapStyle} ref={wrapRef} onScroll={handleScroll} >
                <div className="scroll-content" style={contentStyle}>
                    {props.children}
                </div>
            </div>
            {
                barDisplay.hasVBar ? (
                    <Bar
                        direction='vertical'
                        parentRef={wrapRef}
                        size={scrollState.vBarItemHeight}
                        move={scrollState.moveY}
                        barStyle={props.vBarStyle}
                        barItemStyle={props.vBarItemStyle}
                        className='scrollbar-v-bar'
                    />
                ) : <></>
            }
            {
                barDisplay.hasHBar ? (
                    <Bar
                        direction='horizontal'
                        parentRef={wrapRef}
                        size={scrollState.hBarItemWidth}
                        move={scrollState.moveX}
                        barStyle={props.hBarStyle}
                        barItemStyle={props.hBarItemStyle}
                        className='scrollbar-h-bar'
                    />
                ) : <></>
            }
        </div >
    )
}

export { Scroll };