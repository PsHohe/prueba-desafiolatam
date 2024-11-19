import { EventEmitter } from 'node:events';
import { Task } from '../models/Task';

export class NotificationService extends EventEmitter {
  constructor() {
    super();
  }

  notifyTaskCompleted(task: Task) {
    this.emit('taskCompleted', task);
  }

  notifyTaskUpdated(task: Task) {
    this.emit('taskUpdated', task);
  }

  onTaskCompleted(callback: (task: Task) => void) {
    this.on('taskCompleted', callback);
  }

  onTaskUpdated(callback: (task: Task) => void) {
    this.on('taskUpdated', callback);
  }
}
