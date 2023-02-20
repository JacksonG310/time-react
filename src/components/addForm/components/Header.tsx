import { TagItem } from "@/api/types";
import { Selector } from "@/components";
import { SvgIcon } from "@/components/base/SvgIcon";
import { IMPORTANCE, ImportanceItem } from "@/constants/constants";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import { Input } from "antd";
import dayjs from "dayjs";
import React, { ChangeEvent, MouseEvent, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

interface StateProps {
    tags: TagItem[],
    taskForm: TaskForm
}

interface Props extends StateProps {
    isEdit: boolean;
}


const FormHeaderBase: React.FC<Props> = (props) => {

    const { tags, taskForm } = props;

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => matterActions.setTaskForm('title', e.target.value);
    const handleImportanceClick = (item: ImportanceItem) => matterActions.setTaskForm('importance', item.id);
    const handleTagClick = (item: TagItem) => matterActions.setTaskForm('classifyId', item.id);

    const handleFinishClick = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const { id, finishStatus, finishTime, status } = taskForm;
        const body = {
            taskId: id,
            finishTime: finishTime ? null : dayjs().toDate(),
            finishStatus: finishStatus ? 0 : 1,
            status: status === 0 ? 1 : 0,
            updated: dayjs().toDate()
        }
        await matterActions.updateTaskStatus(body);
        await matterActions.getAllTasks();
    }
    const { importanceIcon, tagIcon } = useMemo(() => {

        const renderImportanceIcon = () => IMPORTANCE[taskForm.importance - 1] || IMPORTANCE[0];
        const renderTagIcon = () => tags.find((item) => item.id === taskForm.classifyId) || tags[0];

        const importanceIcon = renderImportanceIcon();
        const tagIcon = renderTagIcon();

        return { importanceIcon, tagIcon }

    }, [taskForm.classifyId, taskForm.importance])

    useEffect(() => {
        matterActions.resetTaskForm();
    }, []);

    const renderImportance = () => (
        <ul className="importance">
            {
                IMPORTANCE.map((item) => (
                    <li
                        className="importance-item"
                        key={item.id}
                        style={{ color: item.color }}
                        onClick={() => handleImportanceClick(item)}
                    >
                        <div className="icon">
                            <SvgIcon name={item.icon} width="20px" height="20px" />
                        </div>
                        <span className="title">
                            {item.title}
                        </span>
                        <div className="current" style={{ display: taskForm.importance === item.id ? 'block' : 'none' }}>
                            <SvgIcon name="checked" width="14px" height="14px" />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
    const renderClassify = () => (
        <ul className="classify">
            {
                tags.map((item) => (
                    <li className="classify-item" key={item.id} onClick={() => handleTagClick(item)}>
                        <div className="icon" style={{ backgroundColor: item.color }}>
                            <img src={item.iconUrl} alt="" />
                        </div>
                        <div className="title">
                            {item.name}
                        </div>
                        <span className="checked" style={{ display: item.id === taskForm.classifyId ? 'block' : 'none' }}>
                            <SvgIcon name="tagChecked" width="20px" height="20px" />
                        </span>
                    </li>
                ))
            }
        </ul>
    )
    const importance = renderImportance();
    const classify = renderClassify();

    return (
        <div className="formHeader">
            {
                props.isEdit ? (
                    <div className="icon" onClick={handleFinishClick}>
                        {
                            taskForm.status === 0 ? (
                                <div className="circle"></div>
                            ) : (
                                taskForm.finishStatus == 1 ? (
                                    <SvgIcon name="finish" width="28px" height="28px" />
                                ) : (
                                    <SvgIcon name="fail" width="28px" height="28px" />
                                )
                            )
                        }
                    </div>
                ) : <></>
            }
            <div className="titleWrap">
                <Input
                    placeholder="把事情记录下来"
                    value={taskForm.title}
                    bordered={false}
                    onChange={handleTitleChange}
                />
            </div>
            <Selector
                className="importanceSelector"
                trigger="click"
                placement='bottomLeft'
                content={importance}
                circle
                icon={importanceIcon.icon}
                iconWrapStyle={{
                    backgroundColor: importanceIcon.bg
                }}
            />
            <Selector
                className="classifySelector"
                trigger="click"
                placement='bottomLeft'
                content={classify}
                circle
                iconType="png"
                icon={tagIcon.iconUrl}
                iconWrapStyle={{
                    backgroundColor: tagIcon.color
                }}
            />
        </div>
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        tags: state.root.matterModule.tags,
        taskForm: state.root.matterModule.taskForm
    }
}

const FormHeader = connect(mapStateToProps)(FormHeaderBase);

export { FormHeader }