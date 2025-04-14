import { Notification } from './classes/Notification.js';
import { AdminTasks } from './classes/AdminTasks.js';
import { inputTask, tasksObj, form, btnAddTasks } from './main.js';

const adminTasksInstance = new AdminTasks();
let editTask = false;

export function readTaskValue(event) {
  tasksObj.task = event.target.value.trim().toLowerCase();
};

export function readTaskPriorityValue(event) {
  tasksObj.priority = event.target.value;
}

export function submitForm(event) {
  event.preventDefault();

  if (tasksObj.task === '') return new Notification({ text: 'Debes añadir una tarea', type: 'error' });

  editTask ? editUserTaskToHTML() : addUserTaskToHTML();
  editTask = false;
  form.reset();
};

function addUserTaskToHTML() {
  adminTasksInstance.addTask({ ...tasksObj });

  // Reset the object to prevent the user to add the same task multiple times
  Object.assign(tasksObj, { id: generateId(), task: '' });
};

function editUserTaskToHTML() {
  adminTasksInstance.editTask({ ...tasksObj });

  // Reset the object to prevent the user to update the same task multiple times
  Object.assign(tasksObj, { id: generateId(), task: '' });
  btnAddTasks.textContent = 'Añadir';
};

export function updateTaskObj(cloneObj) {
  Object.assign(tasksObj, cloneObj);
  inputTask.value = cloneObj.task;
  btnAddTasks.textContent = 'Guardar Cambios';
  editTask = true;
};

export function generateId() {
  const generateID = new Date().getTime();
  return generateID;
};