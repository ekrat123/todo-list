export default class Task {
  constructor(name, priority = "", time = "no time", description = "") {
    this.name = name;
    this.priority = priority;
    this.time = time;
    this.description = description;
  }

  getTaskName() {
    return this.name;
  }

  getTaskTime() {
    return this.time;
  }

  getFormattedTime() {
    const [year, month, day] = this.time.split("-");
    return `${month}/${day}/${year}`;
  }
}
