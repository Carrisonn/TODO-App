import { form } from '../main.js';

export class Notification {
  constructor({ text, type }) {
    this.text = text;
    this.type = type;

    this.showNotification();
  }

  showNotification() {
    const notification = document.createElement('div');
    notification.classList.add('notification');

    const existNotification = document.querySelector('.notification');
    existNotification ? existNotification.remove() : null;

    this.type === 'error' ? notification.classList.add('red-notification') : notification.classList.add('green-notification');
    notification.textContent = this.text;

    form.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  }
};