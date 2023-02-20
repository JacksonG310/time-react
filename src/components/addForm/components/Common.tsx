import { SvgIcon } from "@/components";
import { TimerPicker } from "@/components/TImerPicker";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import { computedLastTimeText, computedTimeRangeText, computedTimeText } from "@/utils/timeText";
import { Popover } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
interface StateProps {
    taskForm: TaskForm
}
interface Props extends StateProps {
    isEdit: boolean;
};
const FormCommonBase: React.FC<Props> = (props) => {
    const { taskForm } = props;
    const { startTime, endTime, finishStatus, status, finishTime } = taskForm;

    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const handleCancel = () => setIsPickerOpen(false);

    const handleSave = (timeInfo: Date | Array<Date>) => {
        const time: { [key: string]: Date } = {};
        if (Array.isArray(timeInfo)) {
            time.from = timeInfo[0];
            time.to = timeInfo[1];
        } else {
            time.from = timeInfo;
            time.to = timeInfo;
        }
        matterActions.setTaskForm('startTime', time.from);
        matterActions.setTaskForm('endTime', time.to);
        setIsPickerOpen(false);
    }

    return (
        <div className="formCommon">
            <div className="formCommonWrap">
                <div className="time-row">
                    <div className="clock-icon">
                        <SvgIcon name="clock" width="16px" height="16px" />
                    </div>
                    {
                        !(status == 1 && finishStatus) ? (
                            <div className="addTime">
                                <Popover
                                    content={<TimerPicker onCancel={handleCancel} onSave={handleSave} />}
                                    trigger="click"
                                    placement="bottomLeft"
                                    open={isPickerOpen}
                                    onOpenChange={(open) => setIsPickerOpen(open)}
                                >
                                    {
                                        startTime == null && endTime == null ? ('设置时间') :
                                            computedTimeRangeText(startTime, endTime)
                                    }
                                </Popover>
                            </div>
                        ) : (
                            <div className="startTime">
                                <div className="label">开始时间</div>
                                <div className="time">
                                    {computedTimeText(startTime!)}
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    status == 1 && finishStatus ? (
                        <div className="result-row">
                            <div className="finishTime">
                                <div className="icon">
                                    <SvgIcon name="finish-checked" width="16px" height="16px" />
                                </div>
                                <div className="label">结束时间</div>
                                <div className="time">
                                    {computedTimeText(finishTime!)}
                                </div>
                            </div>
                            <div className="payTime">
                                <div className="icon">
                                    <SvgIcon name="like" width="16px" height="16px" />
                                </div>
                                <div className="label">花费时间</div>
                                <div className="time">
                                    {computedLastTimeText(startTime, finishTime)}
                                </div>
                            </div>
                        </div>
                    ) : <></>
                }
            </div>
        </div >
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        taskForm: state.root.matterModule.taskForm
    }
}

const FormCommon = connect(mapStateToProps)(FormCommonBase);

export { FormCommon }