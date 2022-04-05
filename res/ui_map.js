import {
    DB_AddTask,
    DB_updateTaskStatus,
    DB_RemoveTask,
} from "./firestore_functions";
import { taskDBTemplate, taskUITemplate, getNextTaskID } from "./templates";

//
//
const addTask = document.getElementById("add_task");
const submitModal = document.getElementById("submit_modal");
const exitModal = document.getElementById("exit_modal");
const modal = document.getElementById("task_modal");
const taskName = document.getElementById("task_name");
const tasks = document.getElementById("flex_table");
const dateToday = document.getElementById("date_today");

export const UIelements = {
    btnAddTask: addTask,
    btnSubmitTask: submitModal,
    btnCloseModal: exitModal,
    addTaskModal: modal,
    taskNameInput: taskName,
    tasksWrapper: tasks,
    date: dateToday,
};

//
// UI FUNCTIONS

export const openModal = () => {
    UIelements.addTaskModal.style.display = "block";
    const newDay = { weekday: "long" };

    UIelements.date.innerHTML = new Intl.DateTimeFormat("en-US", newDay).format(
        new Date()
    );
};

//
export const closeModal = () => {
    UIelements.addTaskModal.style.display = "none";
};

//
//
export const submitTask = () => {
    const task_name = UIelements.taskNameInput.value;
    UIelements.taskNameInput.value = "";
    let taskId = `task_${getNextTaskID()}`;

    const newTask = taskDBTemplate(task_name);
    DB_AddTask(newTask, taskId);

    UIelements.tasksWrapper.appendChild(
        taskUITemplate(task_name, false, taskId)
    );

    closeModal();
};

//
//
export const deleteTask = (taskElement) => {
    let taskId = taskElement.id;

    taskElement.remove();

    DB_RemoveTask(taskId);
};

//
//
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
