import { ScrollX } from "@/components";
import ListCard from "@/components/ListCard";
import React from "react";
import "./index.less";
const CheckList = () => {
    return (
        <div className="checklist">
            <ScrollX>
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
                <ListCard />
            </ScrollX>
        </div>
    )
}

export default CheckList;