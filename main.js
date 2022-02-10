// Import the functions you need from the SDKs you need

// import { firebaseConfig } from "./firestore_config.js";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// import { getAuth, connectAuthEmulator, signInWithCredential } from "firebase/auth";
import { fireStoreApp } from "./firestore_config";
import { pregenerateTasks } from "./pregenerateTodos";

const database = getFirestore(fireStoreApp);
// const auth = getAuth(app);

// Returns the user collection promise
async function getUserDocs(db) {
    const getUser = collection(db, "user_01");
    const userSnapshot = await getDocs(getUser);
    const theUserObject = userSnapshot.docs.map((toDo) => toDo.data());

    return theUserObject;
}

const addUserDataToUI = (userData) => {
    const taskArray = pregenerateTasks(userData);
    for (let i = 0; i < taskArray.length; i++) {
        taskTable.appendChild(taskArray[i]);
    }
};

// Resolves the user collection and returns the user docs
getUserDocs(database)
    .then(addUserDataToUI)
    .catch((error) => console.log(error));

// BUILD THE UI
const btnAddTask = document.getElementById("add_task");
const btnSubmitTask = document.getElementById("submit_modal");
const modal = document.getElementById("task_modal");
const taskName = document.getElementById("task_name");
const taskTable = document.getElementById("flex_table");
const checkMark = document.querySelectorAll(".task-checkmark");

// function to start creating a task
const openModal = () => {
    modal.style.display = "block";
};

// function to start closing a task
const closeModal = () => {
    modal.style.display = "none";
};

//  function to submit task
const submitTaskName = () => {
    const taskText = taskName.value;
    taskName.value = "";

    taskTable.appendChild(generateTask(taskText));

    closeModal();
};

// add submitted task to UI
const generateTask = (text) => {
    console.log(text);
    // add wrapping element
    const parent = document.createElement("div");
    parent.classList.add("task", "in-progress");

    // add checkbox element
    const checkNode = document.createElement("div");
    checkNode.innerHTML = "&#10003;";
    checkNode.classList.add("task-checkmark");
    parent.addEventListener("click", () => completeTask(checkNode, parent));
    parent.appendChild(checkNode);

    // add text element
    const textNode = document.createElement("div");
    textNode.classList.add("task-text");
    textNode.textContent += text.toString();
    parent.appendChild(textNode);

    return parent;
};

// mark task as completed
export const completeTask = (checkBoxElement, parentTask) => {
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

// event listeners
btnAddTask.addEventListener("click", openModal);
btnSubmitTask.addEventListener("click", submitTaskName);
