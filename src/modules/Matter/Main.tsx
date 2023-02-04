import React, { useEffect, useState } from "react";
import "./index.less";
import { Outlet, useLocation } from "react-router-dom";
import MatterHeader from "@/components/Header";
import { Switch } from "antd";
import AddBtn from "@/components/addBtn";
import AddForm from "@/components/addForm";
import { useTitle } from "@/hooks/Matter/useTitle";
import { RootState } from "@/types";
import { connect } from "react-redux";
import { matterActions } from ".";

const HideCom = (
    <div className="hide">
        <Switch defaultChecked />
        <span>隐藏已完成</span>
    </div>
)

interface StateProps {
    addFormVisible: boolean
}

interface Props extends StateProps { };

const IssueBase: React.FC<Props> = (props) => {
    const [matterTitle] = useTitle();
    const { addFormVisible } = props;
    const handleClick = () => matterActions.changleAddFormVisible(!addFormVisible);
    return (
        <div className="matter-view">
            <div className="matter-header">
                <MatterHeader left={matterTitle} right={HideCom} />
            </div>
            <div className="matter-body">
                <Outlet />
            </div>
            <AddForm visiable={addFormVisible} />
            <AddBtn onClick={handleClick} />
        </div>
    )
}

function mapStateToProps(state: RootState) {
    return {
        addFormVisible: state.root.matterModule.addFormVisible
    }
}

const Issue = connect(mapStateToProps)(IssueBase);

export default Issue;

