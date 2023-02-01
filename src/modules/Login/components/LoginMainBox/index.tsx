import { UserLoginBody$POST } from "@/api/types";
import { FormItem, Input, SvgIcon } from "@/components";
import { isPhone, passwordValidator, usernameValidator } from "@/utils/rules";
import Valicator from "@/utils/Validator";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.less';
import { userAction } from "../..";
const LoginMainBox: React.FC = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        account: "",
        password: "",
    })
    const [errorMsg, setErrorMsg] = useState({
        usernameErrrorMsg: "",
        passwordErrorMsg: "",
    })
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLoginForm({
            account: value,
            password: loginForm.password
        })
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLoginForm({
            account: loginForm.account,
            password: value
        })
    }
    const validatrUsername = () => {
        const result = new Valicator(usernameValidator.validator).addRules([{ value: loginForm.account, rules: usernameValidator.rules }]).validate();
        setErrorMsg({
            usernameErrrorMsg: result.error[0] || result.error[1],
            passwordErrorMsg: errorMsg.passwordErrorMsg
        })
        return !result.hasError;
    }
    const validDatePassword = () => {
        const result = new Valicator(passwordValidator.validator).addRules([{ value: loginForm.password, rules: passwordValidator.rules }]).validate();
        setErrorMsg({
            usernameErrrorMsg: errorMsg.usernameErrrorMsg,
            passwordErrorMsg: result.error[0],
        })
        return !result.hasError;
    }

    const handleLogin = async () => {
        const isValid = validatrUsername() && validDatePassword();
        if (isValid) {
            const body: UserLoginBody$POST = {
                ...loginForm,
                isMobile: isPhone(loginForm.account)
            }
            const res = await userAction.login(body);
            if (res) {
                navigate('/');
            }
        }
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
                                    value={loginForm.account}
                                    onChange={onUsernameChange}
                                    onBlur={(e) => validatrUsername(e.target.value)}
                                />
                            </div> */}
                            <Input
                                type="text"
                                placeholder="手机号/邮箱"
                                onChange={onUsernameChange}
                                onBlur={validatrUsername}
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
                                onBlur={validDatePassword}
                            />
                            <a href={void 0} onClick={handleLogin} className="login-btn">
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