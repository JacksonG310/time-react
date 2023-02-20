import { AddTagBody$POST, TagItem, TaskItem } from "@/api/types";
import { Scroll, SvgIcon, VirtualList } from "@/components";
import AddClassifyForm from "@/components/addClassifyForm";
import ListCard from "@/components/ListCard";
import { ALL_CARD } from "@/constants/constants";
import { RootState } from "@/types";
import { getRandom } from "@/utils/getRamdon";
import React, { CSSProperties, useEffect, useState } from "react";
import { connect } from "react-redux";
import { matterActions } from "../..";
import ListCardHeader from "./components/ListCardHeader";
import "./index.less";

interface StateProps {
    tags: Array<TagItem>;
    tasks: Array<TaskItem>;
    userId: number;
}
interface Props extends StateProps { };

const CheckListBase: React.FC<Props> = (props) => {
    const { tags, userId, tasks } = props;
    const contentStyle: CSSProperties = { paddingBottom: '20px', borderRadius: '12px' };
    const barStyle: CSSProperties = {
        width: "200px",
        height: "8px",
        backgroundColor: '#efeff1',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-20px',
        zIndex: '10'
    }
    const barItemStyle: CSSProperties = {
        backgroundColor: '#d7d7d9'
    }
    const [isFormShow, setIsFormShow] = useState(false);
    const handleCancel = () => setIsFormShow(false);
    const handleBuild = async (title: string, iconId: string, color: string) => {
        const tagId = getRandom(4, 10000);
        const creatorId = userId;
        const body: AddTagBody$POST = {
            title,
            iconId,
            color,
            creatorId,
            tagId
        }
        await matterActions.addTag(body);
        setIsFormShow(false);
    }

    const getData = async () => {
        await matterActions.getAllTags();
        await matterActions.getAllTasks();
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="checklist" >
            <Scroll
                width="100%"
                height="100%"
                maxHeight="100%"
                maxWidth="100%"
                direction="x"
                trigger="alaways"
                contentStyle={contentStyle}
                hBarStyle={barStyle}
                hBarItemStyle={barItemStyle}

            >
                <ListCard
                    header={<ListCardHeader
                        name={ALL_CARD.name}
                        color={ALL_CARD.color}
                        icon={ALL_CARD.iconUrl}
                        configurable={false}
                    />}
                    content={<VirtualList data={tasks} itemHegiht={51} name={ALL_CARD.name} />}
                />
                {
                    tags.map((item) => {
                        const tasks = props.tasks.filter(task => task.classifyId === item.id);
                        return (
                            <ListCard
                                header={<ListCardHeader name={item.name} color={item.color} id={item.id} icon={item.iconUrl} />}
                                content={<VirtualList data={tasks} itemHegiht={51} name={item.name} />}
                                key={item.id} />
                        )
                    })
                }
                {
                    !isFormShow ? (
                        <div className="addClassify" onClick={() => setIsFormShow(true)}>
                            <div className="addClassify-wrap">
                                <div className="addClassify-icon">
                                    <SvgIcon name="task" width="12px" height="12px" />
                                </div>
                                添加分类
                            </div>
                        </div>
                    ) : (
                        <AddClassifyForm onCancel={handleCancel} onBuild={handleBuild} />
                    )
                }
            </Scroll>
        </div>
    )
}

function mapStateToProps(state: RootState) {
    return {
        tags: state.root.matterModule.tags,
        userId: state.root.mainModule.userInfo!.userId,
        tasks: state.root.matterModule.tasks
    }
}

const CheckList = connect(mapStateToProps)(CheckListBase);

export default CheckList;