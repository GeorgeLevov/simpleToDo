import { UIelements, openModal, submitTask, closeModal } from "./res/ui_map";

UIelements.btnAddTask.addEventListener("click", openModal);

UIelements.btnSubmitTask.addEventListener("click", submitTask);

UIelements.btnCloseModal.addEventListener("click", closeModal);
