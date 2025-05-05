import { Notification } from './Notification.js';
import { divUserTasks } from '../main.js';
import { updateTaskObj } from '../functions.js';

export class AdminTasks {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks = [...this.tasks, task];
    new Notification({ text: '¡Tarea añadida!', type: 'success' });
    this.orderByPriority()
  }

  editTask(updatedTask) {
    this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    new Notification({ text: 'Tarea Actualizada Correctamente', type: 'success' });
    this.orderByPriority()
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    new Notification({ text: 'Tarea Eliminada correctamente', type: 'success' });
    this.renderTasks()
  }

  orderByPriority() {
    const priorityOrder = { low: 0, medium: 1, high: 2 };
    this.tasks.sort((obj1, obj2) => priorityOrder[obj2.priority] - priorityOrder[obj1.priority]); // high priority first, low priority last
    this.renderTasks()
  }

  renderTasks() {
    while (divUserTasks.firstChild) {
      divUserTasks.removeChild(divUserTasks.firstChild);
    }

    if (this.tasks.length === 0) return divUserTasks.setHTMLUnsafe('<p class="no-tasks-p">Sin tareas pendientes</p>');

    this.tasks.forEach(taskObj => {
      const { id, task, priority } = taskObj;

      const divShowTasks = document.createElement('div'); // Main Container
      divShowTasks.classList.add('div-show-tasks');

      const formattedTask = task.replace(/^\w/, character => character.toUpperCase());
      const userDivTasksPriority = document.createElement('div'); // Task Info Container
      userDivTasksPriority.classList.add('div-user-tasks-priority');
      userDivTasksPriority.setHTMLUnsafe(`
        <p class="user-info">Pendiente: <span class="primary-color user-task-span">${formattedTask}</span></p>
        <p class="user-info">Prioridad: <span class="primary-color user-task-span">${this.dictPriority(priority)}</span></p>
      `);

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

      divShowTasks.appendChild(userDivTasksPriority); // Add task info container to main container
      divShowTasks.appendChild(userDivBtns); // Add btns container to main container

      divUserTasks.appendChild(divShowTasks); // Add main container to the html static container
    })
  }

  dictPriority(priority) {
    const dictPriority = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta'
    }

    for (const [key, value] of Object.entries(dictPriority)) {
      if (priority === key) return value;
    }
  }
};