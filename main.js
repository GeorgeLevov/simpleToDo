import { UIObject, openModal, submitTask, closeModal } from "./res/ui_map";

UIObject.btnAddTask.addEventListener("click", openModal);

UIObject.btnSubmitTask.addEventListener("click", submitTask);

UIObject.btnCloseModal.addEventListener("click", closeModal);
