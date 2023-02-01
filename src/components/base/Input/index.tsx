import React, { CSSProperties } from "react";
import './index.less';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    style?: CSSProperties
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="input-component" style={props.style}>
            <input {...props} />
        </div>
    )
}

export { Input }