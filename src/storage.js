import Task from "./task";
import Project from "./project";
import CreateTodoList from "./todoList";

export default class Storage {
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

  static getAllProjects() {
    const todoList = Storage.getTodoList();
    return todoList.getProjects();
  }
}
