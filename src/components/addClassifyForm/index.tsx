import { IconColor, IconName, ICON_COLOR, ICON_NAME } from "@/constants/icon";
import { Button, Input } from "antd";
import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import { Scroll } from "../base/Scroll";
import ListCard from "../ListCard";
import IconTable from "./components/IconTable";
import "./index.less";

interface Props {
    onCancel: () => void;
    onBuild: (title: string, iconId: string, color: string) => void;
}

const AddClassifyForm: React.FC<Props> = (props) => {
    const { onCancel, onBuild } = props;

    const [currentClassify, setCurrentClassify] = useState({
        iconId: 2001,
        iconUrl: ICON_NAME[0].url,
        colorId: '10001',
        color: ICON_COLOR[0].color,
        title: '',
    })
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentClassify({
        ...currentClassify,
        title: e.target.value
    })
    const handleChangIcon = (newIconId: number, newIconUrl: string) => setCurrentClassify({
        ...currentClassify,
        iconId: newIconId,
        iconUrl: newIconUrl
    })
    const handleChangColor = (newColorId: string, newColor: string) => setCurrentClassify({
        ...currentClassify,
        colorId: newColorId,
        color: newColor
    });
    const renderIconTabelCell = (pageData: Array<IconName>) => (
        pageData.map((item) => {
            return (
                <div className="icon-item" key={item.id} onClick={() => handleChangIcon(item.id, item.url)}>
                    <div className="icon-item-wrap" style={{ borderColor: currentClassify.iconId === item.id ? currentClassify.color : '#fff' }}>
                        <img src={item.url} alt="" />
                    </div>
                </div>
            )
        })
    )

    const renderColorTabelCell = (pageData: Array<IconColor>) => (
        pageData.map((item) => {
            return (
                <div className="color-item" key={item.id} onClick={() => handleChangColor(item.id, item.color)}>
                    <div className="color-item-wrap" style={{ borderColor: currentClassify.colorId === item.id ? currentClassify.color : '#fff' }}>
                        <span style={{ backgroundColor: `${item.color}` }}></span>
                    </div>
                </div>
            )
        })
    )
    const renderHeader = () => <Input bordered={false} placeholder="请输入类别名称" onChange={handleTitleChange} />
    const renderContent = () => (
        <Scroll maxWidth="100%" maxHeight="100%" width="100%" height="100%" trigger="none">
            <IconTable
                CWidth={308}
                CHeihgt={228}
                IWidth={51}
                IHeight={57}
                data={ICON_NAME}
                tableCell={renderIconTabelCell}
                title="图标"
                color={currentClassify.color}
                iconUrl={currentClassify.iconUrl}
            />
            <IconTable
                CWidth={308}
                CHeihgt={96}
                IWidth={38}
                IHeight={48}
                data={ICON_COLOR}
                tableCell={renderColorTabelCell}
                title="颜色"
            />
            <div className="button-group">
                <Button className="cabcel-btn" onClick={onCancel}>取消</Button>
                <Button className="build-btn" type="primary" onClick={() => onBuild(currentClassify.title, currentClassify.iconId + '', currentClassify.color)}>创建</Button>
            </div>
        </Scroll>
    )
    const cardRef = useRef<HTMLDivElement>(null);
    const header = renderHeader();
    const content = renderContent();

    return (
        <React.Fragment>
            <ListCard header={header} content={content} ref={cardRef} />
        </React.Fragment>
    )
}

export default AddClassifyForm;