import { TagItem, TaskItem } from "@/api/types";

export const nestTask = (tags: Array<TagItem>, tasks: Array<TaskItem>) => {
    for (let i = 0; i < tags.length; i++) {
        if (!tags[i].task) tags[i].task = [];
        for (let j = 0; j < tasks.length; j++) {
            if (tags[i].id === tasks[j].classifyId) {
                tags[i].task.push(tasks[j]);
            }
        }
    }
}