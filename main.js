const btnAddTask = document.getElementById("add_task");
const btnSubmitTask = document.getElementById("submit_modal");
const modal = document.getElementById("task_modal");
const taskName = document.getElementById("task_name");
const taskTable = document.getElementById("flex_table");

const openModal = () => {
    modal.style.display = "block";
};
const closeModal = () => {
    modal.style.display = "none";
};

const generateTask = (text) => {
    const parent = document.createElement("div");
    parent.classList.add("task");
    const node = document.createTextNode(text);
    parent.appendChild(node);

    return parent;
};

const submitTask = () => {
    const taskText = taskName.value;
    taskName.value = "";

    taskTable.appendChild(generateTask(taskText));

    closeModal();
};

btnAddTask.addEventListener("click", openModal);

btnSubmitTask.addEventListener("click", submitTask);
