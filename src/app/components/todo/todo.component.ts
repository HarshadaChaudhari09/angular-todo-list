import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskStorageService } from '../../services/task-storage.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  editTitle = '';
  message = '';

  constructor(private taskStorage: TaskStorageService) {}

  ngOnInit(): void {
    this.tasks = this.taskStorage.loadTasks();
  }

  get completedCount(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();

    if (!title) {
      this.showMessage('Please enter a task before adding it.');
      return;
    }

    const task: Task = {
      id: Date.now(),
      title,
      completed: false,
      editing: false
    };

    this.tasks.unshift(task);
    this.newTaskTitle = '';
    this.saveAndShowMessage('Task added successfully.');
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveAndShowMessage('Task deleted.');
  }

  toggleCompleted(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  startEdit(task: Task): void {
    this.cancelAllEdits();
    task.editing = true;
    this.editTitle = task.title;
  }

  saveEdit(task: Task): void {
    const title = this.editTitle.trim();

    if (!title) {
      this.showMessage('Task title cannot be empty.');
      return;
    }

    task.title = title;
    task.editing = false;
    this.editTitle = '';
    this.saveAndShowMessage('Task updated.');
  }

  cancelEdit(task: Task): void {
    task.editing = false;
    this.editTitle = '';
  }

  private cancelAllEdits(): void {
    this.tasks.forEach((task) => {
      task.editing = false;
    });
  }

  private saveTasks(): void {
    this.taskStorage.saveTasks(this.tasks);
  }

  private saveAndShowMessage(text: string): void {
    this.saveTasks();
    this.showMessage(text);
  }

  private showMessage(text: string): void {
    this.message = text;

    window.setTimeout(() => {
      this.message = '';
    }, 2500);
  }
}
