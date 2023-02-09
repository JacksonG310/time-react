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

export const LISTCARD_MORE = [
    {
        icon: 'edit',
        title: '修改分类标题',
        method: 'handleEdit'
    }, {
        icon: 'delete',
        title: '删除分类',
        method: 'handleDelete'
    }
]

export interface ImportanceItem {
    icon: string;
    title: string;
    color: string;
    id: number;
    bg: string
}
export const IMPORTANCE: Array<ImportanceItem> = [
    {
        icon: 'one',
        title: '重要且紧急',
        color: '#f37377',
        bg: '#f4dce5',
        id: 1
    },
    {
        icon: 'two',
        title: '重要不紧急',
        color: '#ffbc66',
        bg: '#ffedd8',
        id: 2
    },
    {
        icon: 'three',
        title: '不重要紧急',
        color: '#28c28c',
        bg: '#def3e7',
        id: 3
    },
    {
        icon: 'four',
        title: '不重要不紧急',
        color: '#5bb3ff',
        bg: '#d1e8ff',
        id: 4
    }
]