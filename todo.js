const tasks = [];

const taskNameInput = document.getElementById("taskContent");
const taskList = document.getElementById("taskList");

const createTaskElement = ({ name, isCompleted }) => {
  const taskElement = document.createElement("li");
  taskElement.textContent = name;
  if (isCompleted) taskElement.classList.add("styleComplete");

  return taskElement;
};

const printTasks = () => {
  const taskElements = tasks.map(createTaskElement);
  taskList.replaceChildren(taskElements);
};

const clearInput = () => {
  taskNameInput.value = "";
};

const addTask = () => {
  const name = taskNameInput.value;
  tasks.push({ name, isCompleted: false });

  clearInput();
  saveToLocalStorage();
  printTasks();
};

function saveToLocalStorage() {
  const tasksArray = [];
  const taskItems = taskList.getElementsByTagName("li");

  for (let i = 0; i < taskItems.length; i++) {
    tasksArray.push(taskItems[i].textContent);
  }

  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function loadFromLocalStorage() {
  const tasksArray = JSON.parse(localStorage.getItem("tasks"));
  if (tasksArray) {
    tasksArray.forEach((newItem) => {
      const newTask = document.createElement("li");
      newTask.textContent = newItem;
      taskList.appendChild(newTask);
    });
  }
  // localStorage.setItem('tasks', JSON.stringify(tasksArray))
}

loadFromLocalStorage();

var allLi = document.querySelectorAll("li");
for (const li of allLi) {
  li.addEventListener("click", () => {
    li.classList.toggle("styleComplete");
  });
}

window.addTask = addTask;
