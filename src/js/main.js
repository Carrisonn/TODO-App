import { readTaskValue, submitForm, generateId, readTaskPriorityValue } from './functions.js';

window.addEventListener('load', () => form.reset());

//attribute 'checked' doesn't work on firefox, need to force the state with js
document.querySelector('#low-priority').checked = true;
export const inputTask = document.querySelector('#input-task');
export const btnAddTasks = document.querySelector('#btn-add-tasks');
export const form = document.querySelector('#form');
export const divUserTasks = document.querySelector('#div-user-tasks');
const radioButtons = document.querySelectorAll('input[type="radio"]');

inputTask.addEventListener('input', readTaskValue);
form.addEventListener('submit', submitForm);
radioButtons.forEach(radioBtn => radioBtn.addEventListener('change', readTaskPriorityValue));

export const tasksObj = {
  id: generateId(),
  task: '',
  priority: 'low'
}