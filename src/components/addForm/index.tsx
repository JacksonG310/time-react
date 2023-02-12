import { TagItem, UserLoginResponse$POST } from "@/api/types";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import { timeValidator, titleValidator } from "@/utils/rules";
import { AppLocalInfo } from "@/utils/storage";
import Validator from "@/utils/Validator";
import { Button, message, Modal } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Scroll } from "..";
import { FormCommon } from "./components/Common";
import { FormHeader } from "./components/Header";
import FormMore from "./components/More";
import "./index.less";


interface StateProps {
    taskForm: TaskForm,
    userInfo: AppLocalInfo,
}
interface Props extends StateProps {
    addFromVisiable: {
        visitable: boolean;
        isEdit: boolean;
    };
}

const AddFormBase: React.FC<Props> = (props) => {
    const { taskForm, userInfo, addFromVisiable } = props;

    const validateTitle = (title: string) => {
        const res = new Validator(titleValidator.validator).addRules([{ value: title, rules: titleValidator.rules }]).validate();
        if (res.error[0]) message.error(res.error[0]);
        return !res.hasError;
    }

    const validateTime = (time: Date | null) => {
        const res = new Validator(timeValidator.validator).addRules([{ value: time, rules: timeValidator.rules }]).validate();
        if (res.error[0]) message.error(res.error[0]);
        return !res.hasError;
    }

    const handleBulid = async () => {
        const { classifyId, importance, remark, title, startTime, endTime } = taskForm;
        const res = validateTitle(title.trim()) && validateTime(startTime) && validateTime(endTime);
        if (!res) return;

        const body = {
            classifyId,
            status: 0,
            importance,
            created: new Date(),
            updated: new Date(),
            remark,
            creator: userInfo.userId,
            from: startTime!,
            to: endTime!,
            title
        }
        await matterActions.addTask(body);
    }
    const handleSave = () => {

    }
    const handleCancel = () => {
        matterActions.changleAddFormVisible(false);
    }
    const FormFooter = [
        addFromVisiable.isEdit ? (<Button key='delete'>删除</Button>) : <div key="delete"></div>,
        <Button key='cancel' onClick={handleCancel}>取消</Button>,
        <Button
            key='submit'
            type="primary"
            onClick={addFromVisiable.isEdit ? handleSave : handleBulid}>
            {addFromVisiable.isEdit ? "保存" : "创建"}
        </Button>,
    ]
    return (
        <Modal
            open={addFromVisiable.visitable}
            onCancel={handleCancel}
            closable={false}
            style={{ "minWidth": "322px" }}
            width='322px'
            footer={FormFooter}
        >
            <Scroll maxHeight="400px" maxWidth="100%" width="100%" height="100%" trigger="none">
                <div className="addForm">
                    <FormHeader isEdit={addFromVisiable.isEdit} />
                    <FormCommon />
                    <FormMore isEdit={addFromVisiable.isEdit} />
                </div>
            </Scroll>
        </Modal>
    )
}

function mapStateToProps(state: RootState) {
    return {
        taskForm: state.root.matterModule.taskForm,
        userInfo: state.root.mainModule.userInfo!,
    }
}

const AddForm = connect(mapStateToProps)(AddFormBase)

export default AddForm;