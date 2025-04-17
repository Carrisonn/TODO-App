import { readTaskValue, submitForm, generateId, readTaskPriorityValue } from './functions.js';

export const inputTask = document.querySelector('#input-task');
export const btnAddTasks = document.querySelector('#btn-add-tasks');
export const form = document.querySelector('#form');
export const divUserTasks = document.querySelector('#div-user-tasks');
const radioButtons = document.querySelectorAll('input[type="radio"]');

export const tasksObj = {
  id: generateId(),
  task: '',
  priority: ''
}

window.addEventListener('load', () => form.reset());
inputTask.addEventListener('input', readTaskValue);
form.addEventListener('submit', submitForm);
radioButtons.forEach(radioBtn => radioBtn.addEventListener('change', readTaskPriorityValue));