import { Timestamp } from "firebase/firestore";
import { taskStatusChange, deleteTask } from "./ui_map";

//
// HELPER FUNCTIONS

export const taskElementTemplate = (id) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", `${id}`);
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
    checkElement.classList.add("task-box");
    checkElement.classList.add("task-status");

    if (status) {
        checkElement.classList.add("checked");
    } else {
        checkElement.classList.remove("checked");
    }

    return checkElement;
};

export const taskDeleteElementTemplate = () => {
    const deletionElement = document.createElement("div");
    deletionElement.innerHTML = "&#10007;";
    deletionElement.classList.add("task-box");
    deletionElement.classList.add("task-removal");

    return deletionElement;
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
export const taskUITemplate = (textInput, status, taskID) => {
    const task = taskElementTemplate(taskID);
    const taskStatus = taskStatusElementTemplate(status);
    const taskName = taskNameElementTemplate(textInput);
    const taskDelete = taskDeleteElementTemplate();

    if (status) {
        task.classList.add("completed");
    } else {
        task.classList.add("in-progress");
    }

    // add event listener for the task status element
    taskStatus.addEventListener("click", () =>
        taskStatusChange(taskStatus, task)
    );

    // add event listener for the task removal element
    taskDelete.addEventListener("click", () => deleteTask(task));

    // append nodes to task
    task.appendChild(taskStatus);
    task.appendChild(taskName);
    task.appendChild(taskDelete);

    return task;
};
