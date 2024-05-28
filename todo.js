const taskNameInput = document.getElementById("taskContent");
const taskList = document.getElementById("taskList");

let tasks = [];

const printTasks = () => {
  const taskElements = tasks.map(createTaskElement);
  taskList.replaceChildren(...taskElements);
};

const addTask = () => {
  const name = taskNameInput.value;
  tasks.push({ name, isCompleted: false });

  clearInput();
  saveToLocalStorage();
  printTasks();
};

const createTaskElement = ({ name, isCompleted }) => {
  const taskElement = document.createElement("li");
  taskElement.textContent = name;
  taskElement.addEventListener("click", toggleCompletionState(taskElement));

  if (isCompleted) taskElement.classList.add("styleComplete");

  return taskElement;
};

const toggleCompletionState = (task) => () => {
  task.classList.toggle("styleComplete");
};

const clearInput = () => {
  taskNameInput.value = "";
};

const loadFromLocalStorage = () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
};

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

loadFromLocalStorage();
printTasks();

window.addTask = addTask;
