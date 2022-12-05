import { FormItem, Input, SvgIcon } from "@/components";
import { passwordValidator, usernameValidator } from "@/utils/rules";
import Valicator from "@/utils/Validator";
import { debounce } from "lodash";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './index.less';
const LoginMainBox: React.FC = () => {
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    })
    const [errorMsg, setErrorMsg] = useState({
        usernameErrrorMsg: "",
        passwordErrorMsg: "",
    })
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLoginForm({
            username: value,
            password: loginForm.password
        })
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLoginForm({
            username: loginForm.username,
            password: value
        })
    }
    const validatrUsername = (value: string) => {
        const result = new Valicator(usernameValidator.validator).addRules([{ value: value, rules: usernameValidator.rules }]).validate();
        console.log(result);

        setErrorMsg({
            usernameErrrorMsg: result.error[0] || result.error[1],
            passwordErrorMsg: errorMsg.passwordErrorMsg
        })
        return !result.hasError;
    }
    const validDatePassword = (value: string) => {
        const result = new Valicator(passwordValidator.validator).addRules([{ value: value, rules: passwordValidator.rules }]).validate();
        setErrorMsg({
            usernameErrrorMsg: errorMsg.usernameErrrorMsg,
            passwordErrorMsg: result.error[0],
        })
        return !result.hasError;
    }
    return (
        <div className="login-main-box">
            <div className="login-avatar">
                <img src="" alt="" />
            </div>
            <div className="login-body">
                <div className="login-form">
                    <div className="login-row">
                        <FormItem errorMessage={errorMsg.usernameErrrorMsg}>
                            {/* <div className="input-component">
                                <input
                                    type="text"
                                    placeholder="手机号/邮箱"
                                    value={loginForm.username}
                                    onChange={onUsernameChange}
                                    onBlur={(e) => validatrUsername(e.target.value)}
                                />
                            </div> */}
                            <Input
                                type="text"
                                placeholder="手机号/邮箱"
                                value={loginForm.username}
                                onChange={onUsernameChange}
                                onBlur={(e) => validatrUsername(e.target.value)}
                            />
                        </FormItem>
                    </div>
                    <div className="login-row">
                        <FormItem errorMessage={errorMsg.passwordErrorMsg}>
                            {/* <div className="input-component">
                                <input
                                    type="password"
                                    placeholder="密码"
                                    onChange={onPasswordChange}
                                    onBlur={(e) => validDatePassword(e.target.value)}
                                />
                            </div> */}
                            <Input
                                type="password"
                                placeholder="密码"
                                onChange={onPasswordChange}
                                onBlur={(e) => validDatePassword(e.target.value)}
                            />
                            <a href={void 0} className="login-btn">
                                <SvgIcon name="login" className="login-icon" color="#fff" />
                            </a>
                        </FormItem>
                    </div>
                </div>
                <div className="link-group">
                    <Link className="link-item" to="/account/forgot">忘记密码</Link>
                    <Link className="link-item" to="/account/register">立即注册</Link>
                </div>
            </div>
        </div >
    )
}

export default LoginMainBox;