import Header from "@/components/Header";
import { useTitle } from "@/hooks/Matter/useTitle";
import { Switch } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import DatePick from "./components/DatePick";
import "./index.less";

interface Props {
    date?: Dayjs;
}

const HideCom = (
    <div className="hide">
        <Switch defaultChecked />
        <span>隐藏已完成</span>
    </div>
)



const PlanHeader: React.FC<Props> = (props) => {
    const title = useTitle();

    return (
        <Header left={title} center={<DatePick date={props.date || dayjs()} />} right={HideCom} />
    )
}

export default PlanHeader;