import { Scroll } from "@/components";
import ListCard from "@/components/ListCard";
import React, { CSSProperties } from "react";
import "./index.less";
const CheckList = () => {
    const contentStyle = { paddingBottom: '20px' };
    const barStyle: CSSProperties = {
        width: "200px",
        height: "8px",
        backgroundColor: '#efeff1',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-20px',
        zIndex: '10'
    }
    const barItemStyle: CSSProperties = {
        backgroundColor: '#d7d7d9'
    }
    return (
        <div className="checklist">
            <Scroll
                width="100%"
                height="100%"
                maxHeight="100%"
                maxWidth="100%"
                direction="x"
                trigger="alaways"
                contentStyle={contentStyle}
                hBarStyle={barStyle}
                hBarItemStyle={barItemStyle}

            >
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
            </Scroll>
        </div>
    )
}

export default CheckList;