import { debounce } from "lodash";
import React from "react";
import './index.less';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input: React.FC<InputProps> = (props) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() === "") return;
    }
    return (
        <div className="input-component">
            <input {...props} onChange={debounce(onInputChange)} />
        </div>
    )
}

export { Input }