import { addTag, findTags, updateTagTitle } from "@/api/todoClassify";
import { AddTagBody$POST, TagItem, UpdateTagTitle$PUT } from "@/api/types";
import { RootState } from "@/types";
import { Module, register } from "redux-assist";
import Issue from "./Main";

export interface MatterState {
    addFormVisible: boolean;
    tags: Array<TagItem>;
}
const initState: MatterState = {
    addFormVisible: false,
    tags: [],
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
}

const matterActions = register(new MatterModule('matterModule', initState));
export { matterActions, Issue }