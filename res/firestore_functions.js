import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
// import { getAuth, connectAuthEmulator, signInWithCredential } from "firebase/auth";
import { fireStoreApp } from "./firestore_config";
import { taskUITemplate } from "./templates";
import { UIObject } from "./ui_map";

const database = getFirestore(fireStoreApp);

//
// GET ALL TASKS FROM USER
async function getAllUserTasks(db) {
    const user = collection(db, "user_01");
    const tasksSnapshot = await getDocs(user);
    const tasksObject = tasksSnapshot.docs.map((task) => task.data());
    return tasksObject;
}

//
// ADD TASKS TO UI
const addTasksToUI = (userData) => {
    const taskArray = userData.map((task, index) => {
        let taskID = index + 1;
        return taskUITemplate(task.name, task.complete, taskID);
    });

    for (let i = 0; i < taskArray.length; i++) {
        UIObject.tasksWrapper.appendChild(taskArray[i]);
    }
};

//
// GET USER TASKS ON PAGE LOAD
getAllUserTasks(database)
    .then(addTasksToUI)
    .catch((error) => console.log(error));

////////////////////////////////////////////////////////////////////////////

//
// TASK STATUS UPDATE
export const DB_updateTaskStatus = async (taskId, taskStatus) => {
    const taskRef = doc(database, "user_01", taskId);
    await updateDoc(taskRef, { complete: taskStatus }, { merge: true });
};

//
// ADD NEW TASK
export function DB_AddTask(newTask, taskID) {
    const newDocument = doc(database, "user_01", taskID);
    setDoc(newDocument, newTask);
}
