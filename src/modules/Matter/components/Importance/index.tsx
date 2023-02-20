import { TagItem, TaskItem } from "@/api/types";
import { Scroll, VirtualList } from "@/components";
import ListCard from "@/components/ListCard";
import { IMPORTANCE } from "@/constants/constants";
import { RootState } from "@/types";
import React, { CSSProperties, useEffect } from "react";
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

const ImportanceBase: React.FC<Props> = (props) => {
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

    const getData = async () => {
        await matterActions.getAllTags();
        await matterActions.getAllTasks();
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="importance-page" >
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
                {
                    IMPORTANCE.map((item) => {
                        const tasks = props.tasks.filter(task => task.importance === item.id);
                        return (
                            <ListCard
                                header={<ListCardHeader
                                    name={item.title}
                                    color={item.color}
                                    id={item.id}
                                    icon={item.icon}
                                    configurable={false}
                                />}
                                content={<VirtualList data={tasks} itemHegiht={51} name={item.title} />}
                                key={item.id} />
                        )
                    })
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

const Importance = connect(mapStateToProps)(ImportanceBase);

export default Importance;