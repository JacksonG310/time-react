import { Button, FormItem, Input, SvgIcon } from "@/components";
import React from "react";
import { Link } from "react-router-dom";
import "./index.less";

const ReigsterMain = () => {
    return (
        <div className="register-box">
            <h1>欢迎注册</h1>
            <div className="register-body">
                <FormItem>
                    {/* <input type="text" placeholder="请输入手机号" /> */}
                    <Input type="text" placeholder="请输入手机号" />
                </FormItem>
            </div>
            <div className="btn-group">
                <Link to="/account/login" className="back-btn">
                    <SvgIcon name="back" className="back-icon" color="#fff" />
                    返回登录
                </Link>
                <Button icon="direction-right">下一步</Button>
            </div>
        </div>
    )
}

export default ReigsterMain;