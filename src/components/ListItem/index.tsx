import React, { useState } from "react";
import { SvgIcon } from "..";
import "./index.less";
interface ListItemProps {
    item: {
        finish: boolean;
        content: string;
        more: boolean;
    }
}

const ListItem: React.FC<ListItemProps> = (props) => {
    const { content, finish, more } = props.item;
    const [isHover, setIsHover] = useState(false);

    const onMouseEnter = () => setIsHover(true);
    const onMouseLeave = () => setIsHover(false);

    return (
        <div className="listItem" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="itemContent">
                <div className="itemParent">
                    <div className="finish">
                        {
                            !finish ?
                                <div className="circle"></div> :
                                <SvgIcon name="finish" width="16px" height="16px" />
                        }
                    </div>
                    <div className="content">{content}</div>
                    <div className="more" style={{ "display": isHover && more ? 'block' : 'none' }}>更多</div>
                </div>
                <div className="itemMore"></div>
            </div>
        </div>
    )
}

export default ListItem;