import { TagItem } from "@/api/types";
import { Selector } from "@/components";
import { SvgIcon } from "@/components/base/SvgIcon";
import { IMPORTANCE, ImportanceItem } from "@/constants/constants";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import { Input, Popover } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";

interface StateProps {
    tags: TagItem[],
    taskForm: TaskForm
}

interface Props extends StateProps {
    // importance:Array<ImportanceIcon>
}


const FormHeaderBase: React.FC<Props> = (props) => {

    const { tags, taskForm } = props;

    const [currentTag, setCurrentTag] = useState({
        tag: tags[0]
    })

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => matterActions.setTaskForm('title', e.target.value);
    const handleImportanceClick = (item: ImportanceItem) => matterActions.setTaskForm('importance', item);
    const handleTagClick = (item: TagItem) => {
        setCurrentTag({ tag: item })
        matterActions.setTaskForm('classify', item);
    }

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
                        <div className="current" style={{ display: taskForm.importance.id === item.id ? 'block' : 'none' }}>
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
                        <span className="checked" style={{ display: item.id === currentTag.tag.id ? 'block' : 'none' }}>
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
                icon={taskForm.importance.icon}
                iconWrapStyle={{
                    backgroundColor: taskForm.importance.bg
                }}
            />
            <Selector
                className="classifySelector"
                trigger="click"
                placement='bottomLeft'
                content={classify}
                circle
                iconType="png"
                icon={currentTag.tag!.iconUrl}
                iconWrapStyle={{
                    backgroundColor: currentTag.tag!.color
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