import { completeTask } from "./main";

// pregenerateTasks helper functions
const parentDivTemplate = () => {
    const parent = document.createElement("div");
    parent.classList.add("task");
    return parent;
};

const taskNameTemplate = () => {
    const textNode = document.createElement("div");
    textNode.classList.add("task-name");
    return textNode;
};

const checkMarktemplate = () => {
    const checkNode = document.createElement("div");
    checkNode.innerHTML = "&#10003;";
    checkNode.classList.add("task-checkmark");
    return checkNode;
};

export const pregenerateTasks = (toDoList) => {
    // array element to append to body
    const arrayOfTasks = toDoList.map((task) => {
        // extract each from the todoList and convert to HTML element
        const parent = parentDivTemplate();
        const taskName = taskNameTemplate();
        const check = checkMarktemplate();

        taskName.textContent += task.name.toString();
        parent.appendChild(taskName);
        if (task.complete) {
            completeTask(check, parent);
        }
        parent.addEventListener("click", () => completeTask(check, parent));
        parent.appendChild(check);
        return parent;
    });

    return arrayOfTasks;
};
