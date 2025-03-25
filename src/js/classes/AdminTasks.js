import { Notification } from './Notification.js';
import { divUserTasks } from '../main.js';
import { updateTaskObj } from '../functions.js';

export class AdminTasks {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks = [...this.tasks, task];
    this.renderTasks();
  }

  editTask(updatedTask) {
    this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    this.renderTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    new Notification({ text: 'Tarea eliminada correctamente', type: 'success' });
    this.renderTasks();
  }

  renderTasks() {
    while (divUserTasks.firstChild) {
      divUserTasks.removeChild(divUserTasks.firstChild);
    }

    if (this.tasks.length === 0) return divUserTasks.innerHTML = '<p class="no-tasks-p">Sin tareas pendientes</p>';

    this.tasks.forEach(taskObj => {
      const { id, task } = taskObj;

      const divShowTasks = document.createElement('div'); // Main Container
      divShowTasks.classList.add('div-show-tasks');

      const formattedTask = task.replace(/^\w/, character => character.toUpperCase());
      const userTask = document.createElement('p');
      userTask.classList.add('user-task');
      userTask.innerHTML = `Pendiente: <span class="primary-color user-task-span">${formattedTask}</span>`;

      const userDivBtns = document.createElement('div'); // Buttons Container
      userDivBtns.classList.add('div-btns');

      const userBtnEditTask = document.createElement('button');
      userBtnEditTask.classList.add('btn-task', 'edit-task');
      userBtnEditTask.textContent = 'Editar';
      const cloneObj = { ...taskObj };
      userBtnEditTask.onclick = () => updateTaskObj(cloneObj);

      const userBtnDeleteTask = document.createElement('button');
      userBtnDeleteTask.classList.add('btn-task', 'delete-task');
      userBtnDeleteTask.textContent = 'Eliminar';
      userBtnDeleteTask.onclick = () => this.deleteTask(id);

      userDivBtns.appendChild(userBtnEditTask); // Add btn to btns container
      userDivBtns.appendChild(userBtnDeleteTask); // Add btn to btns container

      divShowTasks.appendChild(userTask); // Add task to main container
      divShowTasks.appendChild(userDivBtns); // Add btns container to main container

      divUserTasks.appendChild(divShowTasks); // Add main container to the html static container
    })
  }
};