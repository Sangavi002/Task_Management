# Task Management Application

This is a task management application built using React and Chakra UI. It allows users to manage tasks, filter and search tasks based on various criteria, and edit or delete tasks. The application differentiates between admin and user roles, with admins having the ability to create, edit, and delete tasks, while users can only view and edit the status of tasks assigned to them.

## Features

- **Admin Role:**
  - Create new tasks
  - Edit tasks (Username, Task, Status)
  - Delete tasks
- **User Role:**
  - View and edit the status of tasks assigned to them
  - View tasks based on their username

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Chakra UI**: Component library for building modern UIs
- **Axios**: Promise-based HTTP client for making API requests
- **Firebase Realtime Database**: For storing and fetching tasks
- **React Router**: For navigation and routing
- **Responsive Design**: Using Chakra UI's responsive utilities

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm start
```

## Features Overview

### 1. Task Management Table

The main interface displays a table with tasks, allowing admins to view all tasks and users to only see their assigned tasks. The table supports the following features:

- **Search:** Filter tasks by username or task name.
- **Status Filter:** Filter tasks based on their current status (Pending, In Progress, Completed).
- **Edit:** Admins can edit any task, while users can only edit the status of their own tasks.
- **Delete:** Admins can delete tasks.

### 2. Modals for Task Creation and Editing

- **Create Task Modal**: Admins can create new tasks by providing a username, task name, and initial status.
Edit Task Modal: Admins can edit any task's username, task name, and status. Users can only edit the status of tasks assigned to them.

### 3. Drawer Menu for Mobile View

The app supports mobile responsiveness. On mobile devices, the drawer menu provides access to the task creation, search, and logout functionality.

### 4. Authentication and Role Management

The application stores the user role and username in the local storage to determine the user’s access level. Admins have full control over the tasks, while users are restricted to tasks assigned to them.

## File Structure

```grapghql
src/
├── components/
│   ├── CreateTaskModal.js      // Modal to create a new task
│   ├── EditTaskModal.js        // Modal to edit an existing task
│   ├── Home.js                 // Main home page displaying tasks
├── App.jsx                     // Main React component
├── Main.jsx                    // Main layout component with routing
├── Login.jsx                   // Login component for authentication
├── Registration.jsx            // Registration component for new users
```

## API Integration

The app communicates with Firebase Realtime Database using Axios. All tasks are stored in the database, and the following operations are supported:

- **GET:** Fetch tasks from the database
- **POST:** Create a new task
- **PATCH:** Update an existing task
- **DELETE:** Remove a task from the database
  
## Authentication

Authentication is handled by storing the role and username in the local storage. The user role is either "admin" or "user", and based on this role, different permissions are granted.

