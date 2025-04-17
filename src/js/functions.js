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

  const { task, priority } = tasksObj;
  const isInvalidTask = task === '' || priority === '';
  if (isInvalidTask) return new Notification({ text: 'Debes rellenar los campos', type: 'error' });

  editTask ? editUserTaskToHTML() : addUserTaskToHTML();
  editTask = false;
  form.reset();
};

function addUserTaskToHTML() {
  adminTasksInstance.addTask({ ...tasksObj });
  Object.assign(tasksObj, { id: generateId(), task: '', priority: '' });// Reset the object to prevent the user to add the same task multiple times
};

function editUserTaskToHTML() {
  adminTasksInstance.editTask({ ...tasksObj });
  Object.assign(tasksObj, { id: generateId(), task: '', priority: '' }); // Reset the object to prevent the user to update the same task multiple times
  btnAddTasks.textContent = 'Añadir';
};

export function updateTaskObj(cloneObj) {
  Object.assign(tasksObj, cloneObj);
  inputTask.value = cloneObj.task;
  btnAddTasks.textContent = 'Guardar Cambios';
  editTask = true;
};

export function generateId() {
  return new Date().getTime();
};