export const TITLE_MAP = {
    'matter': '事项',
    'allMatter': '列表',
    'important': '四象限',
    'schedule': '日程',
    'checkList': '清单',
    'repeat': '重复',
    'memo': '备忘录',
    'allMemo': '全部备忘录',
    'readNote': '读书笔记',
    'workMemo': '工作',
    'lifeMemo': '生活',
    'diaryList': '列表',
    'carlendar': '日历',
    'plan': '规划',
    'myDay': '我的一天',
    'myWeek': '我的一周',
    'myMonth': '我的一月'
}

export interface BarMapItem {
    key: 'vertical' | 'horizontal';
    size: 'height' | 'width';
    axis: 'Y' | 'X';
    client: 'clientY' | 'clientX';
    scroll: 'scrollTop' | 'scrollLeft';
    scrollSize: 'scrollHeight' | 'scrollWidth';
    offset: 'offsetHeight' | 'offsetWidth';
    direction: 'top' | 'left';
    wide: 'width' | 'height';
}

interface BarMap {
    [key: string]: BarMapItem;
}


export const BAR_MAP: BarMap = {
    vertical: {
        offset: 'offsetHeight',
        key: 'vertical',
        size: 'height',
        wide: 'width',
        axis: 'Y',
        client: 'clientY',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        direction: 'top',
    },
    horizontal: {
        offset: 'offsetWidth',
        key: 'horizontal',
        size: 'width',
        wide: 'height',
        axis: 'X',
        client: 'clientX',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        direction: 'left',
    },
};
