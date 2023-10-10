import "normalize.css";
import "./style.css";

class Task {
  constructor(name, time = "no time", description = "", priority = "") {
    this.name = name;
    this.time = time;
    this.description = description;
    this.priority = priority;
  }

  getTaskName(task) {
    return task.name;
  }

  getTaskTime(task) {
    return task.time;
  }

  getFormattedTime() {
    const [day, month, year] = this.time.split("/");
    return `${month}/${day}/${year}`;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(newTask) {
    if (this.tasks.some((task) => task.getTaskName() === newTask.name)) return;
    this.tasks.push(newTask);
  }

  deleteTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
  }

  getTask(taskName) {
    return this.tasks.find((task) => task.getName() === taskName);
  }

  getAllTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}

class CreateTodoList {
  constructor() {
    this.projects = [];
  }

  addProject(newProjectName) {
    if (!this.projects.some((project) => project.name === newProjectName)) {
      const project = new Project(newProjectName);
      this.projects.push(project);
    }
  }

  deleteProject(projectName) {
    this.projects = this.projects.filter(
      (project) => project.name !== projectName
    );
  }

  getProject(projectName) {
    return this.projects.find((project) => project.name === projectName);
  }

  getProjects() {
    return this.projects;
  }

  setProjects(projects) {
    this.projects = projects;
  }
}

class Storage {
  static saveTodoList(data) {
    localStorage.setItem("todoList", JSON.stringify(data));
  }

  static getTodoList() {
    const todoList = Object.assign(
      new CreateTodoList(),
      JSON.parse(localStorage.getItem("todoList"))
    );

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    todoList
      .getProjects()
      .forEach((project) =>
        project.setTasks(
          project.getAllTasks().map((task) => Object.assign(new Task(), task))
        )
      );

    return todoList;
  }

  static makeProject(name) {
    const todoList = Storage.getTodoList();
    todoList.addProject(name);
    Storage.saveTodoList(todoList);
  }

  static deleteProject(name) {
    const todoList = Storage.getTodoList();
    todoList.deleteProject(name);
    Storage.saveTodoList(todoList);
  }

  static addTask(projectName, task) {
    const todoList = Storage.getTodoList();
    todoList.getProject(projectName).addTask(new Task(task));
    Storage.saveTodoList(todoList);
  }
}

const domElements = (function () {})();

class UI {}
