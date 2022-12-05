
const required = (value: string) => !!value;

const isEmail = (value: string) => /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(value);
const isPhone = (value: string) => /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value);
const isEmailOrPhone = (value: string) => isEmail(value) || isPhone(value);

export const usernameValidator = {
    validator: { required, isEmailOrPhone },
    rules: [
        { strategy: "required" as const, errorMsg: "请输入手机号/邮箱" },
        { strategy: "isEmailOrPhone" as const, errorMsg: "手机号/邮箱格式有误" }
    ]
}

export const passwordValidator = {
    validator: { required },
    rules: [
        { strategy: "required" as const, errorMsg: "请输入密码" }
    ]
}