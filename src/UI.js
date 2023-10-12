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
  const projectSection = document.querySelector("[data-sectionProject]");
  const projectContent = document.querySelector("[data-projectContent]");
  const container = document.querySelector(".container");

  return {
    addProjectBtn,
    addProjectForm,
    addProjectInp,
    addProjectCancel,
    projectContainer,
    projectSection,
    projectContent,
    container,
  };
})();

export default class UI {
  static displayProjects() {
    const allProjects = Storage.getAllProjects();
    domElements.projectContainer.innerHTML = "";
    const htmlProjects = allProjects
      .map(
        (project, id) =>
          `<div class= "tile" data-id= ${id} data-key = "project">${project.name}</div>`
      )
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
    });
  }

  static setCancelFormBtn() {
    domElements.addProjectCancel.addEventListener("click", function () {
      domElements.addProjectForm.classList.add("none");
      domElements.addProjectBtn.classList.remove("none");
    });
  }

  static displayProjectContent() {
    domElements.container.addEventListener("click", function (e) {
      const targetData = e.target.dataset.key;
      if (targetData === "project") {
        const currentProject = Storage.getTodoList().getProject(
          e.target.textContent.trim()
        );
        domElements.projectContent.innerHTML = `<h4>${currentProject.name}</h4><form data-addTaskForm="addTaskForm">
        <div class="addTAskContainer">
          <input type="text" data-addTaskInp="addTaskInp" />
          <select name="priority" id="priority" data-priority="priority">
            <option value="0">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="date" name="date" id="date" data-dateInp="dateInp" />
          <img class="addTaskBtn" data-addTaskBtn="addTaskBtn" data-currentProjectName = "${currentProject.name}" src="images/add.svg"/>
        </div>
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="5"
          data-description="description"
        ></textarea>
      </form>`;
      }
    });
  }

  static addTaskEvent() {
    domElements.container.addEventListener("click", function (e) {
      if (e.target.classList.contains("addTaskBtn")) {
        const newTaskName = document.querySelector("[data-addTaskInp]").value;
        const newTaskPriority = document.querySelector("[data-priority]").value;
        const newTaskTime = document.querySelector("[data-dateInp]").value;
        const newTaskDescription =
          document.querySelector("[data-description]").value;

        const newTask = new Task(
          newTaskName,
          newTaskPriority,
          newTaskTime,
          newTaskDescription
        );

        const currentProjectName = e.target.getAttribute(
          "data-currentProjectName"
        );

        Storage.addTask(currentProjectName, newTask);
        console.log(Storage.getTodoList());
      }
    });
  }
}
