import { addTask, findTasks } from "@/api/task";
import { addTag, findTags, updateTagTitle } from "@/api/todoClassify";
import { AddTagBody$POST, AddTaskBody$POST, TagItem, UpdateTagTitle$PUT } from "@/api/types";
import { IMPORTANCE, ImportanceItem } from "@/constants/constants";
import { RootState } from "@/types";
import { Module, register } from "redux-assist";
import Issue from "./Main";

export interface MatterState {
    addFormVisible: boolean;
    tags: Array<TagItem>;
    taskForm: TaskForm
}
export interface TaskForm {
    classify: TagItem | null;
    importance: ImportanceItem;
    remark: string;
    creator: number;
    title: string;
    timeInfo: {
        from: Date | null;
        to: Date | null;
    }
}
const initState: MatterState = {
    addFormVisible: false,
    tags: [],
    taskForm: {
        classify: null,
        importance: IMPORTANCE[0],
        remark: '',
        creator: -1,
        title: '',
        timeInfo: {
            from: null,
            to: null
        }
    }
}

class MatterModule extends Module<MatterState, RootState>{
    changleAddFormVisible(value: boolean) {
        this.setState({
            addFormVisible: value
        })
    }
    async getAllTags() {
        const { userId, token } = this.rootState.root.mainModule.userInfo!;
        const res = await findTags(userId, token);
        this.setState({
            tags: [
                ...res.tags
            ]
        });
    }
    async addTag(body: AddTagBody$POST) {
        const { token } = this.rootState.root.mainModule.userInfo!;
        await addTag(body, token);
        this.getAllTags();
    }
    async updateTagTitle(body: UpdateTagTitle$PUT) {
        const { token } = this.rootState.root.mainModule.userInfo!;
        await updateTagTitle(body, token);
    }
    async addTask(body: AddTaskBody$POST) {
        const { token } = this.rootState.root.mainModule.userInfo!;
        await addTask(body);
        this.resetState(['tags']);
    }
    async getAllTasks() {
        const { userId, token } = this.rootState.root.mainModule.userInfo!;
        const res = await findTasks(userId, token);

    }
    setTaskForm(key: (keyof TaskForm), value: any) {
        const taskForm = {
            ...this.state.taskForm,
            [key]: value
        }
        this.setState({
            taskForm
        })
    }
}

const matterActions = register(new MatterModule('matterModule', initState));
export { matterActions, Issue }