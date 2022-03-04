import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
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
    const tasksObject = tasksSnapshot.docs.map((task) => {
        return {
            id: task.id,
            data: task.data(),
        };
    });
    return tasksObject;
}

//
// ADD TASKS TO UI
const initialAddTasksToUI = (userData) => {
    const taskArray = userData.map((task) => {
        return taskUITemplate(task.data.name, task.data.complete, task.id);
    });

    for (let i = 0; i < taskArray.length; i++) {
        UIObject.tasksWrapper.appendChild(taskArray[i]);
    }
};

//
// GET USER TASKS ON PAGE LOAD
getAllUserTasks(database)
    .then(initialAddTasksToUI)
    .catch((error) => console.log(error));

////////////////////////////////////////////////////////////////////////////

//
// TASK STATUS UPDATE
export const DB_updateTaskStatus = async (taskId, taskStatus) => {
    const taskRef = doc(database, "user_01", taskId);
    updateDoc(taskRef, { complete: taskStatus }, { merge: true });
};

//
// ADD NEW TASK
export function DB_AddTask(newTask, taskID) {
    const newDocument = doc(database, "user_01", taskID);
    setDoc(newDocument, newTask);
}

//
// REMOVE TASK
export function DB_RemoveTask(taskID) {
    const docToBeDeleted = doc(database, "user_01", taskID);

    deleteDoc(docToBeDeleted);
}
