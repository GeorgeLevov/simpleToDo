import { arrayRemove } from "firebase/firestore";
import {
    DB_AddTask,
    DB_updateTaskStatus,
    DB_RemoveTask,
} from "./firestore_functions";
import { taskDBTemplate, taskUITemplate } from "./templates";

//
//
const addTask = document.getElementById("add_task");
const submitModal = document.getElementById("submit_modal");
const exitModal = document.getElementById("exit_modal");
const modal = document.getElementById("task_modal");
const taskName = document.getElementById("task_name");
const tasks = document.getElementById("flex_table");
const dateToday = document.getElementById("date_today");

export const UIObject = {
    btnAddTask: addTask,
    btnSubmitTask: submitModal,
    btnCloseModal: exitModal,
    addTaskModal: modal,
    taskNameInput: taskName,
    tasksWrapper: tasks,
    date: dateToday,
};

//
//
const getNextTaskID = () => {
    let nextIDNumber = 0;
    const arrayOfTaskIDNumbers = Array.from(UIObject.tasksWrapper.children).map(
        (task) => {
            let taskIDString = task.id.toString().replace("task_", "");
            return parseInt(taskIDString);
        }
    );
    const biggestNumber = Math.max(...arrayOfTaskIDNumbers);
    return biggestNumber + 1;
};

//
// UI FUNCTIONS

export const openModal = () => {
    UIObject.addTaskModal.style.display = "block";
    const newDay = { weekday: "long" };

    UIObject.date.innerHTML = new Intl.DateTimeFormat("en-US", newDay).format(
        new Date()
    );
};

//
export const closeModal = () => {
    UIObject.addTaskModal.style.display = "none";
};

//
//
export const submitTask = () => {
    const taskText = UIObject.taskNameInput.value;
    UIObject.taskNameInput.value = "";
    let taskId = `task_${getNextTaskID()}`;

    const newTask = taskDBTemplate(taskText);
    DB_AddTask(newTask, taskId);

    UIObject.tasksWrapper.appendChild(taskUITemplate(taskText, false, taskId));

    closeModal();
};

//
//
export const deleteTask = (taskElement) => {
    let taskId = taskElement.id;

    taskElement.remove();

    DB_RemoveTask(taskId);
};

export const taskStatusChange = (statusElement, taskElement) => {
    let taskId = taskElement.id;
    let taskComplete = false;

    if (!taskElement.classList.contains("completed")) {
        statusElement.classList.add("checked");

        taskElement.classList.remove("in-progress");
        taskElement.classList.add("completed");

        taskComplete = true;
    } else {
        statusElement.classList.remove("checked");

        taskElement.classList.add("in-progress");
        taskElement.classList.remove("completed");
    }

    DB_updateTaskStatus(taskId, taskComplete);
};
