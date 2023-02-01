import { buildPath } from "@/utils/buildPath";
import { Menu, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getMenuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        label,
        key,
        icon,
        children,
        type
    } as MenuItem;
}

const NavBody = () => {
    const items: MenuProps['items'] = [
        // 事项
        getMenuItem("事项", "matter", null, [
            getMenuItem("全部", "allMatter"),
            getMenuItem("日程", "schedule"),
            getMenuItem("清单", "checkList"),
            getMenuItem("重复", "repeat"),

        ]),
        // 备忘录
        getMenuItem("备忘录", "memo", null, [
            getMenuItem("全部", "allMemo"),
            getMenuItem("读书笔记", "readNote"),
            getMenuItem("工作", "workMemo"),
            getMenuItem("生活", "lifeMemo"),
        ]),
        // 日记
        getMenuItem("日记", "diary", null, [
            getMenuItem("清单", "diaryList"),
            getMenuItem("日历", "calendar")
        ]),
        // 规划
        getMenuItem("规划", "plan", null, [
            getMenuItem("我的一天", "myDay"),
            getMenuItem("我的一周", "myWeek"),
            getMenuItem("我的一月", "myMonth")
        ]),
    ]

    const navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => navigate(buildPath(e.keyPath));
    return <Menu
        style={{ width: 240 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        onClick={(e) => onClick(e)}
    // theme="dark"
    />
}

export { NavBody };