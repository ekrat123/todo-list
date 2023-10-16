import Task from "./task";
import Project from "./project";
import Storage from "./storage";
import CreateTodoList from "./todoList";

const domElements = (function () {
  const addProjectBtn = document.querySelector("[data-add-project]");
  const addProjectInp = document.querySelector("[data-add-project-input]");
  const addProjectForm = document.querySelector("[data-add-project-form]");
  const addProjectCancel = document.querySelector("[data-add-project-cancel]");
  const projectContainer = document.querySelector("[data-project-container]");
  const projectSection = document.querySelector("[data-section-project]");
  const projectContent = document.querySelector("[data-project-content]");
  const container = document.querySelector("[data-container]");

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
          `<div class="tile"><span class = "projectName" data-key="project"><img src = "images/project.svg" /> ${project.name}</span>
          <span ><img data-delete-project= "${project.name}" src="images/delete.svg" alt="delete"/></span></div>`
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
        domElements.projectContent.innerHTML = `<div class = "taskContainer"><h4>${currentProject.name}</h4>
        <div class = "taskDiv" data-task-div> </div>
        <form data-add-task-form="addTaskForm">
        <div class="addTaskContainer">
         <span class = "addInput"><label for = "addTaskInput">Taskname:  </label><input id = "addTaskInput" type="text" data-add-task-inp="addTaskInp" /></span>
          <select name="priority" id="priority" data-priority="priority">
            <option value="0">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="date" name="date" id="date" data-date-inp="dateInp" />
          <img class="addTaskBtn" data-add-task-btn = "addTaskBtn" data-current-project-name = "${currentProject.name}" src="images/add.svg"/>
        </div>
        <textarea
        placeholder = "Add a description..."
          name="description"
          id="description"
          cols="50"
          rows="3"
          data-description="description"
        ></textarea>
      </form></div>`;

        UI.displayProjectTask(currentProject.name);
      }
    });
  }

  static addTaskEvent() {
    domElements.container.addEventListener("click", function (e) {
      if (e.target.getAttribute("data-add-task-btn") === "addTaskBtn") {
        let newTaskName = document.querySelector("[data-add-task-inp]").value;
        let newTaskPriority = document.querySelector("[data-priority]").value;
        let newTaskTime = document.querySelector("[data-date-inp]").value;
        let newTaskDescription =
          document.querySelector("[data-description]").value;

        const newTask = new Task(
          newTaskName,
          newTaskPriority,
          newTaskTime,
          newTaskDescription
        );

        const currentProjectName = e.target.getAttribute(
          "data-current-project-name"
        );

        Storage.addTask(currentProjectName, newTask);
        UI.displayProjectTask(currentProjectName);
        // Clear the input fields
        document.querySelector("[data-add-task-inp]").value = "";
        document.querySelector("[data-priority]").value = "0";
        document.querySelector("[data-date-inp]").value = "";
        document.querySelector("[data-description]").value = "";
      }
    });
  }

  static displayProjectTask(projectName) {
    const currentTasks = Storage.getTodoList()
      .getProject(projectName)
      .getAllTasks();

    const tasksDiv = document.querySelector("[data-task-div]");
    tasksDiv.innerHTML = "";

    const tasksHtml = currentTasks
      .map((task) => {
        return `<div class="task">
        <span class = "task">
      <span class="taskName">${task.name}</span>
      <span class="taskTime">${task.time}</span>
      <span class = "deleteTask"><img data-project-name = "${projectName}"data-delete-task= "${task.name}" src="images/delete.svg" alt="delete"/></span>
      </span>
      <span class="taskDescription">${task.description}</span>
    </div>`;
      })
      .join(" ");
    tasksDiv.innerHTML = tasksHtml;
  }

  static deleteProject() {
    domElements.projectContainer.addEventListener("click", function (e) {
      if (e.target.dataset.deleteProject) {
        const currentProjectName = e.target.dataset.deleteProject;
        Storage.deleteProject(currentProjectName);
        UI.displayProjects();
        domElements.projectContent.innerHTML = "";
      }
    });
  }

  static deleteTask() {
    domElements.projectContent.addEventListener("click", function (e) {
      if ("deleteTask" in e.target.dataset) {
        const projectName = e.target.dataset.projectName;
        const taskName = e.target.dataset.deleteTask;
        Storage.deleteTask(projectName, taskName);
        UI.displayProjectTask(projectName);
      }
    });
  }
}
