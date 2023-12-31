import "normalize.css";
import "./style.css";
import Task from "./task";
import Project from "./project";
import CreateTodoList from "./todoList";
import Storage from "./storage";
import UI from "./UI";

UI.displayProjects();
UI.getProject();
UI.setCancelFormBtn();
UI.displayProjectContent();
UI.addTaskEvent();
UI.deleteProject();
UI.deleteTask();
// UI.createAllProject();
