import React from "react";
import "./index.less";
interface FormItemProps {
    errorMessage?: string;
    children?: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = (props) => {
    const { errorMessage, children } = props;
    return (
        <div className="time-form-item">
            {children}
            <div className="errorMessage" style={{ opacity: errorMessage ? 1 : 0 }}>
                {errorMessage}
            </div>
        </div>
    )
}

export { FormItem };