import React, { useEffect } from "react";
import "./index.less";
import { Outlet, useLocation } from "react-router-dom";
import MatterHeader from "@/components/Header";
import { TITLE_MAP } from "@/constants/titlleMap";
import { Switch } from "antd";

const HideCom = (
    <div className="hide">
        <Switch defaultChecked />
        <span>隐藏已完成</span>
    </div>
)


const Issue = () => {


    const location = useLocation();

    const computedTitle = () => {
        const path = location.pathname;
        const keys = path.split("/");
        const title = keys.reduce((title, key, index) => {
            const val = TITLE_MAP[key as keyof typeof TITLE_MAP];
            if (!val) return title;
            if (index != keys.length - 1) {
                return title + val + '-';
            } else {
                return title + val;
            }
        }, "");
        return title;
    }

    return (
        <div className="matter-view">
            <div className="matter-header">
                <MatterHeader left={computedTitle()} right={HideCom} />
            </div>
            <div className="matter-body">
                <Outlet />
            </div>
        </div>
    )
}

export default Issue;

