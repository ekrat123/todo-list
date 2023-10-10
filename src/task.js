export default class Task {
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
