import { Timestamp } from "firebase/firestore";
import { taskStatusChange } from "./ui_map";

//
// HELPER FUNCTIONS

export const taskElementTemplate = (id) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", `task_${id}`);
    return taskElement;
};

export const taskNameElementTemplate = (input) => {
    const textElement = document.createElement("div");
    textElement.classList.add("task-name");
    textElement.textContent = input.toString();
    return textElement;
};

export const taskStatusElementTemplate = (status) => {
    const checkElement = document.createElement("div");
    checkElement.innerHTML = "&#10003;";
    checkElement.classList.add("task-checkmark");

    if (status) {
        checkElement.classList.add("checked");
    } else {
        checkElement.classList.remove("checked");
    }

    return checkElement;
};

export const taskDBTemplate = (taskName) => {
    return {
        name: taskName,
        date: Timestamp.fromDate(new Date()),
        complete: false,
    };
};

//
//
export const taskUITemplate = (textInput, status, index) => {
    const task = taskElementTemplate(index);
    const taskStatus = taskStatusElementTemplate(status);
    const taskName = taskNameElementTemplate(textInput);

    if (status) {
        task.classList.add("completed");
    } else {
        task.classList.add("in-progress");
    }

    // add event listener for the task status element
    task.addEventListener("click", () => taskStatusChange(taskStatus, task));

    // append nodes to task
    task.appendChild(taskStatus);
    task.appendChild(taskName);

    return task;
};
