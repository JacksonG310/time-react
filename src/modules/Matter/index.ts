import { addTask, findTaskById, findTasks, updateStatus, updateTask } from "@/api/task";
import { addTag, findTags, updateTagTitle } from "@/api/todoClassify";
import { AddTagBody$POST, AddTaskBody$POST, TagItem, TaskItem, UpdateStatusBody$POST, UpdateTagTitle$PUT, UpdateTaskBody$PUT } from "@/api/types";
import { RootState } from "@/types";
import { message } from "antd";
import { Module, register } from "redux-assist";
import Issue from "./Main";

export interface MatterState {
    addFormVisible: {
        visitable: boolean;
        isEdit: boolean;
    };
    tags: Array<TagItem>;
    tasks: Array<TaskItem>;
    taskForm: TaskForm;
}


export interface TaskForm {
    id: number;
    classifyId: number;
    status: number;
    importance: number;
    created: Date | null;
    updated: Date | null;
    remark: string;
    creator: number;
    endTime: Date | null;
    startTime: Date | null;
    finishTime: Date | null;
    finishStatus: number | null;
    title: string;
}
const initState: MatterState = {
    addFormVisible: {
        visitable: false,
        isEdit: false
    },
    tags: [],
    tasks: [],
    taskForm: {
        id: -1,
        classifyId: -1,
        status: -1,
        importance: 1,
        created: null,
        updated: null,
        remark: '',
        creator: -1,
        endTime: null,
        startTime: null,
        finishTime: null,
        finishStatus: 0,
        title: ''
    },
}

class MatterModule extends Module<MatterState, RootState>{
    changleAddFormVisible(visitable: boolean, isEdit?: boolean) {
        if (!isEdit) this.resetTaskForm();
        this.setState({
            addFormVisible: {
                visitable,
                isEdit: isEdit ? true : false
            }
        })
    }
    async getAllTags() {
        const { userId, token } = this.rootState.root.mainModule.userInfo!;
        const res = await findTags(userId, token);
        this.setState({
            tags: [
                ...res.tags
            ],
        });
        return res;
    }
    async getAllTasks() {
        const { userId, token } = this.rootState.root.mainModule.userInfo!;
        const res = await findTasks(userId, token);
        this.setState({
            tasks: [
                ...res
            ]
        })
        return res;

    }
    // async getAllTagsAndTasks() {
    //     const tagsArr = await this.getAllTags();
    //     const tasksArr = await this.getAllTasks();
    //     nestTask(tagsArr.tags, tasksArr);

    // }
    async addTag(body: AddTagBody$POST) {
        const { token } = this.rootState.root.mainModule.userInfo!;
        await addTag(body, token);
    }
    async updateTagTitle(body: UpdateTagTitle$PUT) {
        const { token } = this.rootState.root.mainModule.userInfo!;
        await updateTagTitle(body, token);
    }
    async addTask(body: AddTaskBody$POST) {
        const { token } = this.rootState.root.mainModule.userInfo!;
        console.log(body);

        await addTask(body);
        this.getAllTasks();
        this.changleAddFormVisible(false);
        this.resetTaskForm();
    }
    async updateTaskStatus(body: Omit<UpdateStatusBody$POST, "userId">) {
        const { userId } = this.rootState.root.mainModule.userInfo!;
        const data = {
            ...body,
            userId,
        }
        await updateStatus(data);
    }
    async getTaskById(taskId: number) {
        const { visitable, isEdit } = this.state.addFormVisible;
        if (!visitable && !isEdit) return;
        const { userId } = this.rootState.root.mainModule.userInfo!;
        const res = await findTaskById(userId, taskId);
        this.setState({
            taskForm: { ...res }
        })
    }
    async updateTask(body: Omit<UpdateTaskBody$PUT, "userId">) {
        try {
            const { userId } = this.rootState.root.mainModule.userInfo!;
            const data = {
                ...body,
                userId,
            }
            await updateTask(data);
            message.success("修改成功");
        } catch (error) {
            throw error;
        }
    }
    resetTaskForm() {
        const tagId = this.state.tags[0].id;
        this.setState({
            taskForm: { ...initState.taskForm, classifyId: tagId }
        });
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