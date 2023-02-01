import { Button, FormItem, Input, SvgIcon } from "@/components";
import { passwordValidator, phoneValidator } from "@/utils/rules";
import Valicator from "@/utils/Validator";
import { message } from "antd";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userAction } from "../..";
import ValidateBtn from "./components/ValidateBtn";
import "./index.less";

const ReigsterMain = () => {

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        phone: '',
        code: '',
        password: '',
        comfirm: '',
    })
    const [nextFlag, setNextFlag] = useState(false);
    const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, phone: e.target.value });
    const validatePhone = () => {
        const result = new Valicator(phoneValidator.validator).addRules([{ value: formState.phone, rules: phoneValidator.rules }]).validate();
        setErrorMsg({ ...errorMsg, phoneErrMsg: result.error[0] || result.error[1] });
        return !result.hasError;
    }
    const onNextStep = async () => {
        if (!validatePhone()) return;
        const res = await userAction.findAccount(formState.phone);
        if (res.exist) {
            message.info("该手机已经注册，可直接登录");
            return;
        } else {
            setNextFlag(true);
        }
    }


    const [errorMsg, setErrorMsg] = useState({
        phoneErrMsg: '',
        codeErrorMsg: '',
        passwordErrMsg: '',
        comfirmErrMSg: '',
    })
    const onCodeChange = (e: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, code: e.target.value });

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, password: e.target.value });

    const onComfirmChange = (e: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, comfirm: e.target.value });

    const validatePassword = () => {
        const result = new Valicator(passwordValidator.validator).addRules([{ value: formState.password, rules: passwordValidator.rules }]).validate();
        setErrorMsg({ ...errorMsg, passwordErrMsg: result.error[0] || result.error[1] });
        return !result.hasError;
    }
    const validateComfirm = () => {
        const result = new Valicator(passwordValidator.validator).addRules([{ value: formState.comfirm, rules: passwordValidator.rules }]).validate();
        if (formState.password !== formState.comfirm) result.error[passwordValidator.rules.length] = "两次输入密码不一致";
        setErrorMsg({ ...errorMsg, comfirmErrMSg: result.error[0] || result.error[1] });
        return !result.hasError;
    }
    const onSignUp = async () => {
        const isValid = validatePassword() && validateComfirm();
        if (isValid) {
            const nickName = `用户${+new Date()}`;
            const form = { ...formState, nickName };
            const res = await userAction.userRegister(form);
            if (res.status === 1) {
                message.success(res.message);
                navigate("/account/login");
            } else {
                message.error(res.message);
            }
        }
    }
    return (
        <div className="register-box">
            <h1>欢迎注册</h1>
            <div className="register-body">
                {
                    !nextFlag ? (
                        <FormItem errorMessage={errorMsg.phoneErrMsg}>
                            {/* <input type="text" placeholder="请输入手机号" /> */}
                            <Input type="text" placeholder="请输入手机号" onChange={(e) => onPhoneChange(e)} />
                        </FormItem>
                    ) : (
                        <div className="nextStep">
                            <div className="phone-row">{formState.phone}</div>
                            <FormItem errorMessage={errorMsg.codeErrorMsg}>
                                <Input placeholder="请输入验证码" type="text" onChange={onCodeChange} />
                                <ValidateBtn />
                            </FormItem>
                            <FormItem errorMessage={errorMsg.passwordErrMsg}>
                                <Input placeholder="请输入登录密码" type="password" onChange={onPasswordChange} />
                            </FormItem>
                            <FormItem errorMessage={errorMsg.comfirmErrMSg}>
                                <Input placeholder="再次确认登录密码" type="password" onChange={onComfirmChange} />
                            </FormItem>
                        </div>
                    )
                }
            </div>
            <div className="btn-group">
                <Link to="/account/login" className="back-btn">
                    <SvgIcon name="back" className="back-icon" color="#fff" />
                    返回登录
                </Link>
                <Button icon={nextFlag ? '' : 'direction-right'} onClick={!nextFlag ? onNextStep : onSignUp}>{nextFlag ? '注册' : '下一步'}</Button>
            </div>
        </div>
    )
}

export default ReigsterMain;