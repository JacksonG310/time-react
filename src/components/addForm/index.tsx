import { TagItem, UserLoginResponse$POST } from "@/api/types";
import { matterActions, TaskForm } from "@/modules/Matter";
import { RootState } from "@/types";
import { timeValidator, titleValidator } from "@/utils/rules";
import { AppLocalInfo } from "@/utils/storage";
import Validator from "@/utils/Validator";
import Valicator from "@/utils/Validator";
import { Button, message, Modal } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Scroll } from "..";
import { FormCommon } from "./components/Common";
import { FormHeader } from "./components/Header";
import FormMore from "./components/More";
import "./index.less";


interface StateProps {
    taskForm: TaskForm,
    userInfo: AppLocalInfo,
    tags: TagItem[]
}
interface Props extends StateProps {
    visiable: boolean;
}



const AddFormBase: React.FC<Props> = (props) => {
    const handleCancel = () => {
        matterActions.changleAddFormVisible(false);
    }

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
        const { classify, importance, remark, timeInfo, title } = props.taskForm;
        const res = validateTitle(title.trim()) && validateTime(timeInfo.from) && validateTime(timeInfo.to);
        if (!res) return;
        const body = {
            classifyId: classify == null ? props.tags[1].id : classify.id,
            status: 0,
            importance: importance.id,
            created: new Date(),
            updated: new Date(),
            remark,
            creator: props.userInfo.userId,
            from: timeInfo.from!,
            to: timeInfo.to!
        }

        await matterActions.addTask(body);
    }
    const FormFooter = [
        <Button key='fail'>删除</Button>,
        <Button key='cancel'>取消</Button>,
        <Button key='submit' type="primary" onClick={handleBulid}>创建</Button>,
    ]
    return (
        <Modal
            open={props.visiable}
            onCancel={handleCancel}
            closable={false}
            style={{ "minWidth": "322px" }}
            width='322px'
            footer={FormFooter}
        >
            <Scroll maxHeight="400px" maxWidth="100%" width="100%" height="100%" trigger="none">
                <div className="addForm">
                    <FormHeader />
                    <FormCommon />
                    <FormMore />
                </div>
            </Scroll>
        </Modal>
    )
}

function mapStateToProps(state: RootState) {

    return {
        taskForm: state.root.matterModule.taskForm,
        userInfo: state.root.mainModule.userInfo!,
        tags: state.root.matterModule.tags
    }
}

const AddForm = connect(mapStateToProps)(AddFormBase)

export default AddForm;