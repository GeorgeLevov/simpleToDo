import { DB_AddTask, DB_updateTaskStatus } from "./firestore_functions";
import { taskDBTemplate, taskUITemplate } from "./templates";

//
// CONSTRUCTING UI OBJECT
const addTask = document.getElementById("add_task");
const submitModal = document.getElementById("submit_modal");
const modal = document.getElementById("task_modal");
const taskName = document.getElementById("task_name");
const tasks = document.getElementById("flex_table");
const taskCheck = document.querySelectorAll(".task-checkmark");
const dateToday = document.getElementById("date_today");

export const UIObject = {
    btnAddTask: addTask,
    btnSubmitTask: submitModal,
    addTaskModal: modal,
    taskNameInput: taskName,
    tasksWrapper: tasks,
    btnCheckTask: taskCheck,
    date: dateToday,
};

//
// UI FUNCTIONS

export const openModal = () => {
    UIObject.addTaskModal.style.display = "block";
    const newD = new Date();
    UIObject.date.innerHTML = newD.toDateString();
};

//
export const closeModal = () => {
    UIObject.addTaskModal.style.display = "none";
};

//
export const submitTask = () => {
    const taskText = UIObject.taskNameInput.value;
    UIObject.taskNameInput.value = "";
    let taskId = `task_${UIObject.tasksWrapper.children.length + 1}`;
    let taskNumber = UIObject.tasksWrapper.children.length + 1;

    const newTask = taskDBTemplate(taskText);
    DB_AddTask(newTask, taskId);

    UIObject.tasksWrapper.appendChild(
        taskUITemplate(taskText, false, taskNumber)
    );

    closeModal();
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
