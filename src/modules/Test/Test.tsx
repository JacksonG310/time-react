import { Badge, BadgeProps, Button, Calendar, Carousel, Popover } from "antd";
import "./index.less";
import React, { ReactNode, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { connect } from "react-redux";
import { RootState } from "@/types";
import { TaskItem } from "@/api/types";
import { dateFormat } from "@/utils/timePickerUtil";
import { matterActions } from "../Matter";
import { PlanCalendar } from "@/components/base/PlanCalendar";
import { getCurrentMonthDays } from "@/utils/calendarUtil";

interface StateProps {
    tasks: TaskItem[];
}

interface Props extends StateProps {

}

const TestBase: React.FC<Props> = (props) => {
    const res = getCurrentMonthDays(dayjs());
    console.log(res);

    return (
        <PlanCalendar />
    )
};

function mapStateToProps(state: RootState) {
    return {
        tasks: state.root.matterModule.tasks
    }

}

const Test = connect(mapStateToProps)(TestBase);

export default Test;