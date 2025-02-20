import { Notification } from './classes/Notification.js';
import { AdminTasks } from './classes/AdminTasks.js';
import { inputTask, tasksObj, form, btnAddTasks } from './main.js';

const adminTasksInstance = new AdminTasks();
let editTask = false;

export function valueToObject(event) {
  tasksObj.task = event.target.value.trim().toLowerCase();
};

export function submitForm(event) {
  event.preventDefault();

  if (tasksObj.task === '') {
    new Notification({
      text: 'El campo no puede estar vacío',
      type: 'error'
    });
    return;
  }

  editTask ? editUserTaskToHTML() : addUserTaskToHTML();

  form.reset();
  editTask = false;
};

function addUserTaskToHTML() {
  adminTasksInstance.addTask({ ...tasksObj });
  new Notification({
    text: '¡Tarea añadida!',
    type: 'success'
  });

  // Reset the object to prevent the user to add the same task multiple times
  Object.assign(tasksObj, {
    id: generateId(),
    task: ''
  });
};

export function updateTaskObj(taskObj) {
  Object.assign(tasksObj, taskObj);
  inputTask.value = taskObj.task;
  btnAddTasks.textContent = 'Guardar Cambios';
  editTask = true;
};

function editUserTaskToHTML() {
  adminTasksInstance.editTask({ ...tasksObj });
  new Notification({
    text: 'Guardado Correctamente',
    type: 'success'
  })

  // Reset the object to prevent the user to update the same task multiple times
  Object.assign(tasksObj, {
    id: generateId(),
    task: ''
  });

  btnAddTasks.textContent = 'Añadir';
};


export function generateId() {
  const generateID = new Date().getTime();
  return generateID;
};