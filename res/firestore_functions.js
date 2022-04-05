import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
    getFirestore,
    collection,
    where,
    addDoc,
    getDoc,
    getDocs,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";
import { getPerformance } from "firebase/performance";

import { fireStoreApp } from "./firestore_config";
import { taskUITemplate } from "./templates";
import { UIelements } from "./ui_map";

const database = getFirestore(fireStoreApp);
const auth = getAuth();

//
// SignInAnonymously
signInAnonymously(auth)
    .then((signedInInstance) => {
        console.log("UID:", signedInInstance.user.uid);
        // IF USER DOESNT EXIST, ADD THEM TO THE DB
        if (!userExists(user.uid)) {
            setDoc(doc(database, "users", user.uid));

            setDoc(doc(database, "users", user.uid, "tasks", "task_1"), {
                task_name: "Your First Task!",
                task_status: false,
            });
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

//
// Any time the user signs in or signs out, this listener is called
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("LOGGED IN!");

        //
        // GET USER TASKS AFTER USER IS SIGNED IN
        getAllUserTasks(database, user.uid)
            .then((userData) => updateTaskUIWith(userData))
            .catch((error) => console.log(error));
    }
});

///////////////////////////////////////////////////////////////////////////////////

async function userExists(userUID) {
    const userUIDSTRING = String(userUID);

    const userRef = doc(database, "users", userUIDSTRING);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        return true;
    }

    return false;
}

//
// CHECK IF USER EXISTS AND RETURN DATA OR CREATE USER
async function getAllUserTasks(db, userUID) {
    const tasksRef = collection(db, "users", userUID, "tasks");
    const tasksSnapshot = await getDocs(tasksRef);

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
const updateTaskUIWith = (userData) => {
    const taskArray = userData.map((task) => {
        return taskUITemplate(
            task.data.task_name,
            task.data.task_status,
            task.id
        );
    });

    for (let i = 0; i < taskArray.length; i++) {
        UIelements.tasksWrapper.appendChild(taskArray[i]);
    }
};

//
// ADD NEW TASK
export function DB_AddTask(newTask, taskID) {
    const taskRef = doc(
        database,
        "users",
        auth.currentUser.uid,
        "tasks",
        taskID
    );
    setDoc(taskRef, newTask);
}

//
// TASK STATUS UPDATE
export const DB_updateTaskStatus = async (taskId, taskStatus) => {
    const taskRef = doc(
        database,
        "users",
        auth.currentUser.uid,
        "tasks",
        taskId
    );
    updateDoc(taskRef, { task_status: taskStatus }, { merge: true });
};

//
// REMOVE TASK
export function DB_RemoveTask(taskID) {
    const docToBeDeleted = doc(
        database,
        "users",
        auth.currentUser.uid,
        "tasks",
        taskID
    );
    deleteDoc(docToBeDeleted);
}
