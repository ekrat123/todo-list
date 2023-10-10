import Task from "./task";
import Project from "./project";

export default class CreateTodoList {
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
