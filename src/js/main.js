import { valueToObject, submitForm, generateId } from './functions.js';

window.addEventListener('load', () => form.reset());

export const inputTask = document.querySelector('#input-task');
export const btnAddTasks = document.querySelector('#btn-add-tasks');
export const form = document.querySelector('#form');
export const divUserTasks = document.querySelector('#div-user-tasks');

inputTask.addEventListener('input', valueToObject);
form.addEventListener('submit', submitForm);

export const tasksObj = {
  id: generateId(),
  task: ''
}