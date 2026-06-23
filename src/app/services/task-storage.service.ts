import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  private readonly storageKey = 'angular-18-todo-tasks';

  loadTasks(): Task[] {
    const savedTasks = localStorage.getItem(this.storageKey);

    if (!savedTasks) {
      return [];
    }

    try {
      return JSON.parse(savedTasks) as Task[];
    } catch {
      return [];
    }
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
