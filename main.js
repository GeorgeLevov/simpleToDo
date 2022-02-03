const btnAddTask = document.getElementById("add_task");
const btnSubmitTask = document.getElementById("submit_modal");
const modal = document.getElementById("task_modal");
const taskName = document.getElementById("task_name");
const taskTable = document.getElementById("flex_table");
const checkMark = document.querySelectorAll(".task-checkmark");

const openModal = () => {
    modal.style.display = "block";
};
const closeModal = () => {
    modal.style.display = "none";
};

const submitTaskName = () => {
    const taskText = taskName.value;
    taskName.value = "";

    taskTable.appendChild(generateTask(taskText));

    closeModal();
};

const generateTask = (text) => {
    // add wrapping element
    const parent = document.createElement("div");
    parent.classList.add("task", "in-progress");

    // add text element
    const textNode = document.createElement("div");
    textNode.classList.add("task-text");
    textNode.innerHTML += text;
    parent.appendChild(textNode);

    // add checkbox element
    const checkNode = document.createElement("div");
    checkNode.innerHTML += "&#10003;";
    checkNode.classList.add("task-checkmark");
    checkNode.addEventListener("click", () => completeTask(checkNode, parent));
    parent.appendChild(checkNode);
    return parent;
};

const completeTask = (checkBoxElement, parentTask) => {
    if (!checkBoxElement.classList.contains("checked")) {
        checkBoxElement.style.backgroundColor = "hsl(155deg 55% 55%)";
        checkBoxElement.classList.add("checked");

        parentTask.classList.remove("in-progress");
        parentTask.classList.add("completed");
    } else {
        checkBoxElement.style.backgroundColor = "hsl(0 0% 100%)";
        checkBoxElement.classList.remove("checked");

        parentTask.classList.add("in-progress");
        parentTask.classList.remove("completed");
    }
};

btnAddTask.addEventListener("click", openModal);

btnSubmitTask.addEventListener("click", submitTaskName);
