import { TaskItem } from "@/api/types";
import ListItem from "@/components/ListItem";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import "./index.less";
interface VirtualListProps {
    data: Array<TaskItem>;
    itemHegiht: number;
    name: string;
}

const VirtualList = (props: VirtualListProps) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [dispalyData, setDisplayData] = useState<Array<TaskItem>>([]);
    const [itemNum, setItemNum] = useState(0);
    const [paddingStyle, setPaddingStyle] = useState({
        paddingTop: '0px',
        paddingBottom: '0px',
    })
    const [pointInfo, setPointInfo] = useState({
        startIndex: 0,
        endIndex: 0
    });
    useEffect(() => {
        computedNum();
        window.addEventListener('resize', debounce(computedNum, 500));
    }, []);
    const computedNum = () => {
        const { startIndex } = pointInfo;
        const num = Math.floor(listRef.current!.clientHeight / props.itemHegiht) + 2;
        computedDisplayData(startIndex, startIndex + num);
        setItemNum(num);
        setPointInfo({ ...pointInfo, endIndex: pointInfo.startIndex + num - 1 });
    }

    const computedDisplayData = (startIndex: number, endIndex: number) => {
        endIndex = Math.min(endIndex, props.data.length);
        const data = props.data.slice(startIndex, endIndex);
        setDisplayData(data);
    }
    const computedPadding = (startIndex: number, endIndex: number) => {
        const paddingTop = (startIndex - 1) * props.itemHegiht + 'px';
        const paddingBottom = (props.data.length - endIndex) * props.itemHegiht + 'px';
        setPaddingStyle({
            paddingBottom,
            paddingTop
        })
    }
    const onListScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const SIndex = Math.floor(e.currentTarget.scrollTop / props.itemHegiht);
        const EIndex = SIndex + itemNum - 1;
        computedPadding(SIndex, EIndex);
        setPointInfo({
            startIndex: SIndex > 0 ? SIndex - 1 : 0,
            endIndex: EIndex
        })
    }

    useEffect(() => {
        const { startIndex, endIndex } = pointInfo;
        computedDisplayData(startIndex, endIndex);
    }, [pointInfo, props.data]);

    return (
        <div className="virtualList" ref={listRef} onScroll={onListScroll}>
            <div className="listWrap">
                {!(props.name === '全部') ? (
                    <div className="addItem">
                        <div className="addWrap">
                            <div>
                                添加新事项
                            </div>
                        </div>
                    </div>
                ) : <></>}
                <div className="visitableWrap" style={{ ...paddingStyle }}>
                    {
                        dispalyData.length > 0 && dispalyData.map((item, index) => {
                            return <ListItem item={item} key={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export { VirtualList }