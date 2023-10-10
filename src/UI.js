import Task from "./task";
import Project from "./project";
import Storage from "./storage";
import CreateTodoList from "./todoList";

const domElements = (function () {
  const addProjectBtn = document.querySelector("[data-addProject]");
  const addProjectInp = document.querySelector("[data-addProjectInput]");
  const addProjectForm = document.querySelector("[data-addProjectForm]");
  const addProjectCancel = document.querySelector("[data-addProjectCancel]");
  const projectContainer = document.querySelector("[data-projectContainer]");
  return {
    addProjectBtn,
    addProjectForm,
    addProjectInp,
    addProjectCancel,
    projectContainer,
  };
})();

export default class UI {
  static displayProjects() {
    const allProjects = Storage.getAllProjects();
    domElements.projectContainer.innerHTML = "";
    const htmlProjects = allProjects
      .map((project, id) => `<h3 data-id= ${id}>${project.name}</h3>`)
      .join(" ");
    domElements.projectContainer.innerHTML = htmlProjects;
  }

  static getProject() {
    domElements.addProjectBtn.addEventListener("click", function () {
      this.classList.add("none");
      domElements.addProjectForm.classList.remove("none");
    });

    domElements.addProjectForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const newP = domElements.addProjectInp.value;
      if (!newP) return;
      Storage.makeProject(newP);
      UI.displayProjects();
      domElements.addProjectInp.value = "";
      this.classList.add("none");
      domElements.addProjectBtn.classList.remove("none");
      console.log(Storage.getTodoList());
    });
  }
}
