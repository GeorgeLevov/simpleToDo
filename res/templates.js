import { Timestamp } from "firebase/firestore";
import { taskStatusChange, deleteTask, UIelements } from "./ui_map";

//
// HELPER FUNCTIONS

export const getNextTaskID = () => {
    let nextIDNumber = 0;
    const arrayOfTaskIDNumbers = Array.from(
        UIelements.tasksWrapper.children
    ).map((task) => {
        let taskIDString = task.id.toString().replace("task_", "");
        return parseInt(taskIDString);
    });
    const biggestNumber = Math.max(...arrayOfTaskIDNumbers);
    return biggestNumber + 1;
};

export const createElement = (type, options = {}) => {
    const element = document.createElement(type);

    Object.entries(options).forEach(([key, value]) => {
        if (key === "class") {
            Array.from(value.split(" "), (class_name) => {
                element.classList.add(class_name);
            });
        }

        if (key === "dataset") {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
            return;
        }

        if (key === "text") {
            element.textContent = value;
            return;
        }

        element.setAttribute(key, value);
    });

    return element;
};

export const taskDBTemplate = (task_name) => {
    return {
        task_name: task_name,
        task_time_created: Timestamp.fromDate(new Date()),
        task_status: false,
    };
};

//
//
export const taskUITemplate = (task_name, task_status, task_id) => {
    const task = createElement("div", { class: "task", id: `${task_id}` });
    const taskStatus = createElement("div", {
        class: "task-box task-status",
        text: "✓",
    });

    if (task_status) {
        taskStatus.classList.add("checked");
        task.classList.add("completed");
    } else {
        task.classList.add("in-progress");
    }

    const taskName = createElement("div", {
        class: "task-name",
        text: task_name.toString(),
    });

    const taskDelete = createElement("div", {
        class: "task-box task-removal",
        text: "✗",
    });

    // add event listener for the task status element
    taskStatus.addEventListener("click", () =>
        taskStatusChange(taskStatus, task)
    );

    // add event listener for the task removal element
    taskDelete.addEventListener("click", () => deleteTask(task));

    // append nodes to task
    task.append(taskStatus, taskName, taskDelete);

    return task;
};
