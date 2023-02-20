import { SvgIcon } from "@/components";
import { LISTCARD_MORE } from "@/constants/constants";
import { matterActions } from "@/modules/Matter";
import { Input, Popover } from "antd";
import React, { ChangeEvent, useState } from "react";

interface Props {
    color: string;
    icon: string;
    name: string;
    id?: number;
    configurable?: boolean;
}

type Method_Map = {
    [key: string]: () => void
}

const renderMoreContent = (methods: Method_Map) => (
    <ul className="more-content">
        {
            LISTCARD_MORE.map((item, index) => (
                <li className="more-content-item" onClick={methods[item.method]} key={index}>
                    <SvgIcon name={item.icon} width="20px" height="20px" />
                    <span className="title">{item.title}</span>
                </li>
            ))
        }
    </ul >
)

const ListCardHeader: React.FC<Props> = (props) => {
    const { color, name, id, icon, configurable = true } = props;
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen: boolean) => setOpen(newOpen);



    const [isEdit, setIsEdit] = useState(false);
    const methods: Method_Map = {
        handleEdit: () => setIsEdit(true),
        handleDelete() {
            console.log("delete");
        }
    }

    const [title, setTitle] = useState(name);
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleBlur = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value.trim()) return;
        const body = {
            tagId: id!,
            title: value
        }
        await matterActions.updateTagTitle(body);
        setTitle(value);
        setIsEdit(false);
    }
    const content = renderMoreContent(methods);


    return (
        <div className="classifyTitle">
            {
                !isEdit ? (
                    <div className="classifyWrap">
                        <div className="tagIcon" >
                            <SvgIcon name={icon} width="20px" height="20px" />
                        </div>
                        <span className="tagName" style={{ color: `${color}` }}>{title}</span>
                    </div>
                ) : (
                    <Input
                        defaultValue={title}
                        bordered={false}
                        onChange={onTitleChange}
                        onBlur={handleBlur}
                        autoFocus
                    />
                )

            }
            {
                configurable ? (
                    <Popover
                        content={content}
                        trigger="click"
                        placement="bottomRight"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <span className="more-icon">
                            <SvgIcon name="more" height="18px" width="18px" />
                        </span>
                    </Popover>
                ) : <></>
            }
        </div>
    )

}

export default ListCardHeader;