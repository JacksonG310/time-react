import { FormItem, Input } from "@/components";
import React, { CSSProperties } from "react";
import ValidateBtn from "./ValidateBtn";

interface NextStepProps {
    phone: string;
}

const NextStep: React.FC<NextStepProps> = (props) => {
    const { phone } = props;
    console.log(phone);

    return (
        <div className="nextStep">
            <div className="phone-row">{phone}</div>
            <FormItem>
                <Input placeholder="请输入验证码" />
                <ValidateBtn />
            </FormItem>
            <FormItem>
                <Input placeholder="请输入登录密码" type="password" />
            </FormItem>
            <FormItem>
                <Input placeholder="再次确认登录密码" type="password" />
            </FormItem>
        </div>
    )
}

export default NextStep;