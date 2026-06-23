# Angular 18 To-Do List App

This is a beginner-friendly Angular 18 project built with TypeScript and Bootstrap. It lets users add, edit, delete, and complete tasks. Tasks are saved in Local Storage, so they stay available after refreshing the browser.

## Features

- Add new tasks with two-way binding using `[(ngModel)]`
- Display tasks with `*ngFor`
- Show empty states and messages with `*ngIf`
- Mark tasks as completed with event binding
- Edit and delete existing tasks
- Save tasks in browser Local Storage
- Clean responsive Bootstrap UI

## Folder Structure

```text
Angular Project/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── public/
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── app/
│       ├── app.component.ts
│       ├── components/
│       │   └── todo/
│       │       ├── todo.component.ts
│       │       ├── todo.component.html
│       │       └── todo.component.css
│       ├── models/
│       │   └── task.model.ts
│       └── services/
│           └── task-storage.service.ts
└── README.md
```

## Code Overview

### `src/main.ts`

This file starts the Angular app by bootstrapping `AppComponent`.

### `src/app/app.component.ts`

This is the root component. It imports and displays the `TodoComponent`.

### `src/app/models/task.model.ts`

The `Task` interface defines the shape of each task:

- `id`: unique task id
- `title`: task text
- `completed`: whether the task is done
- `editing`: whether the task is currently being edited

### `src/app/services/task-storage.service.ts`

This service handles Local Storage:

- `loadTasks()` reads saved tasks from Local Storage
- `saveTasks(tasks)` saves the current task list

Using a service keeps storage logic separate from UI logic.

### `src/app/components/todo/todo.component.ts`

This is where most of the app logic lives:

- `addTask()` adds a new task
- `deleteTask()` removes a task
- `toggleCompleted()` marks a task as complete or incomplete
- `startEdit()` switches a task into edit mode
- `saveEdit()` saves the edited task title
- `cancelEdit()` exits edit mode without saving

It uses TypeScript properties like `tasks`, `newTaskTitle`, `editTitle`, and `message` to store the current UI state.

### `src/app/components/todo/todo.component.html`

This file contains the template:

- `[(ngModel)]` is used for two-way binding in form inputs
- `(ngSubmit)`, `(click)`, and `(change)` are used for event binding
- `*ngFor` displays all tasks
- `*ngIf` shows messages, empty states, and edit controls conditionally
- `[class.completed]` applies a CSS class when a task is completed

### `src/app/components/todo/todo.component.css`

This file adds small custom styles on top of Bootstrap, such as rounded panels, completed task styling, and mobile spacing.

## Setup Steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open the app in your browser:

   ```text
   http://localhost:4200
   ```

4. Build the app for production:

   ```bash
   npm run build
   ```

## Deploy to GitHub Pages

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push the project to a GitHub repository.
2. In GitHub, open the repository settings.
3. Go to **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push to the `main` or `master` branch.

The workflow builds the app with the correct GitHub Pages base URL and publishes
`dist/angular-18-todo-list/browser`.

## Important Angular Concepts Used

### Components

The app is split into components. `AppComponent` is the root component, and `TodoComponent` contains the to-do list UI and behavior.

### Data Binding

Interpolation displays TypeScript data in HTML:

```html
{{ task.title }}
```

Property binding sets HTML properties from TypeScript values:

```html
[checked]="task.completed"
```

### Event Binding

Event binding runs TypeScript methods when users interact with the page:

```html
(click)="deleteTask(task.id)"
```

### Two-Way Binding

Two-way binding keeps the input and TypeScript property in sync:

```html
[(ngModel)]="newTaskTitle"
```

Because this app uses `ngModel`, `FormsModule` is imported in `TodoComponent`.

### Structural Directives

`*ngFor` repeats HTML for every task:

```html
<li *ngFor="let task of tasks">
```

`*ngIf` shows HTML only when a condition is true:

```html
<div *ngIf="tasks.length === 0">
```

### Local Storage

Local Storage saves data in the browser. This app stores tasks under the key:

```text
angular-18-todo-tasks
```

Refreshing the page reloads tasks from Local Storage.
