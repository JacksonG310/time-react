import { matterActions } from "@/modules/Matter";
import { Button, Modal } from "antd";
import React, { CSSProperties } from "react";
import { Scroll } from "..";
import { FormCommon } from "./components/Common";
import { FormHeader } from "./components/Header";
import FormMore from "./components/More";
import "./index.less";

interface Props {
    visiable: boolean;
}

const FormFooter = [
    <Button key='fail'>删除</Button>,
    <Button key='cancel'>取消</Button>,
    <Button key='submit'>创建</Button>,
]

const AddForm: React.FC<Props> = (props) => {
    const handleCancel = () => {
        matterActions.changleAddFormVisible(false);
    }
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


export default AddForm;