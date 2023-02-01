import React from "react";
import { VirtualList } from "../base/VirtualList";
import "./index.less";

interface ListCardProps {
    item: {
        title: string;
        color: string;
        id: string;
    }
}

const ListCard = () => {
    const useData = () => {
        const arr = [];
        for (let i = 1; i <= 100; i++) {
            arr.push({
                finish: i % 2 == 0,
                content: i + '',
                more: i % 2 == 1
            });
        }
        return arr;
    }
    return (
        <div className="listCard">
            <div className="listCardWrap">
                <div className="listCardTitle">
                    <span className="tagName">全部</span>
                    <span className="more-icon">更多</span>
                </div>
                <div className="listCardContent">
                    <VirtualList data={useData()} itemHegiht={51} />
                </div>
            </div>
        </div>
    )
}

export default ListCard;