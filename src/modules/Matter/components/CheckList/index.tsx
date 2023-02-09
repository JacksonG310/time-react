import { AddTagBody$POST, TagItem } from "@/api/types";
import { Scroll, SvgIcon, VirtualList } from "@/components";
import AddClassifyForm from "@/components/addClassifyForm";
import ListCard from "@/components/ListCard";
import { RootState } from "@/types";
import { getRandom } from "@/utils/getRamdon";
import React, { CSSProperties, useEffect, useState } from "react";
import { connect } from "react-redux";
import { matterActions } from "../..";
import ListCardHeader from "./components/ListCardHeader";
import "./index.less";

interface StateProps {
    tags: Array<TagItem>;
    userId: number;
}
interface Props extends StateProps { };

const useData = () => {
    const arr = [];
    for (let i = 1; i <= 100; i++) {
        arr.push({
            finish: i % 2 == 0,
            content: i + '',
            more: i % 2 == 1
        });
    }
    return arr;
}


const CheckListBase: React.FC<Props> = (props) => {
    const { tags, userId } = props;
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

    useEffect(() => {
        matterActions.getAllTags();
    }, []);
    return (
        <div className="checklist">
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
                    tags.map((item) => {
                        return (
                            <ListCard
                                header={<ListCardHeader name={item.name} color={item.color} id={item.id} />}
                                content={<VirtualList data={useData()} itemHegiht={51} />}
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
    }
}

const CheckList = connect(mapStateToProps)(CheckListBase);

export default CheckList;