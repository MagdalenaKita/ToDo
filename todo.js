const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoGroup = document.getElementById('groups')
const todoListImportant = document.getElementById('todoListImportant');
const todoListNeutral = document.getElementById('todoListNeutral');

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = todoInput.value;
    const selectedGroup = todoGroup.value;

    if(newTask === '') {
        alert('Wpisz zadanie');
        return; // zatrzymuje dodanie pustego pola do listy
    }
    
    addTask(newTask, selectedGroup);
});

function addTask(newTask, selectedGroup) {  
    let task = document.createElement('li');
    task.textContent = newTask;
    task.setAttribute('draggable', true);
    task.classList.add('drag-item');

    if(selectedGroup === 'important') {
        todoListImportant.appendChild(task);
    } else {
        todoListNeutral.appendChild(task);
    }

    const allTodoTasks = document.querySelectorAll("li");
    const checkAllTodoTasks = document.getElementById('checkAll');
    checkAll(allTodoTasks, checkAllTodoTasks);
    // dragAndDrop(allTodoTasks);

    todoInput.value = '';
    saveToLocalStorage();    
}

function saveToLocalStorage() {
    const tasksArrayImportant = [];
    const tasksArrayNeutral = [];
    const taskItemsImportant = todoListImportant.getElementsByTagName('li');
    const taskItemsNeutral = todoListNeutral.getElementsByTagName('li');

    for(let i = 0; i < taskItemsImportant.length; i++) {
        tasksArrayImportant.push(taskItemsImportant[i].textContent);
    }

    for(let j = 0; j < taskItemsNeutral.length; j++) {
        tasksArrayNeutral.push(taskItemsNeutral[j].textContent);
    }
   
    localStorage.setItem('tasksImportant', JSON.stringify(tasksArrayImportant));
    localStorage.setItem('tasksNeutral', JSON.stringify(tasksArrayNeutral));
    
};

function loadFromLocalStorage() {
    const tasksArrayImportant = JSON.parse(localStorage.getItem('tasksImportant'));
    const tasksArrayNeutral = JSON.parse(localStorage.getItem('tasksNeutral'));

    if(tasksArrayImportant) {
        tasksArrayImportant.forEach(newItem => {
            const newTask = document.createElement('li');      
            newTask.textContent = newItem;     
            newTask.classList.add('drag-item');     
            todoListImportant.appendChild(newTask);            
        });
    } 
    
    if(tasksArrayNeutral) {
        tasksArrayNeutral.forEach(newItem => {
            const newTask = document.createElement('li');      
            newTask.textContent = newItem;
            newTask.classList.add('drag-item');           
            todoListNeutral.appendChild(newTask);            
        });
    }
  // localStorage.setItem('tasks', JSON.stringify(tasksArray))  
}

loadFromLocalStorage();

const allTasks = document.querySelectorAll("li");
console.log(allTasks);
const checkAllTasks = document.getElementById('checkAll');
checkAll(allTasks, checkAllTasks);


function checkAll(todoTasks, checkTodoTasks) {
    for (const li of todoTasks) {
        li.addEventListener("click", () => {
            li.classList.toggle("styleComplete");
        });    
        checkTodoTasks.addEventListener("change", () => {
            //li.classList.toggle("styleComplete");
            checkTodoTasks.checked ? li.classList.add("styleComplete") : li.classList.remove("styleComplete");
        })        
    }  
}

// dragAndDrop(allTasks);

// function dragAndDrop(dragAndDropTask) {
//     let draggedItem = null;
//     for (const li of dragAndDropTask) {
//         li.addEventListener("dragstart", (event) => {
//             draggedItem = event.target;
//             console.log(draggedItem);
//         })
    
        
//             todoListNeutral.addEventListener('dragover', (event) => {
//                 event.preventDefault();
//                 console.log(li);
//             })

//             todoListImportant.addEventListener('dragover', (event) => {
//                 event.preventDefault();
//                 console.log(li);
//             })

//             todoListNeutral.addEventListener('drop', (event) => {
//                 event.preventDefault();
//                 const targetItem = event.target;
//                 if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
//                     todoListNeutral.prepend(targetItem);
//                 }
//                 draggedItem = null;                
//             })

//             todoListImportant.addEventListener('drop', (event) => {
//                 event.preventDefault();
//                 const targetItem = event.target;
//                 if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
//                     todoListImportant.prepend(targetItem);
//                 }
//                 draggedItem = null;   
                
//             })    

//         }
    

// }

let draggedItem = null;

todoListImportant.addEventListener('dragstart', handleDragStart);
todoListImportant.addEventListener('dragover', handleDragOver);
todoListImportant.addEventListener('drop', handleDrop);

todoListNeutral.addEventListener('dragstart', handleDragStart);
todoListNeutral.addEventListener('dragover', handleDragOver);
todoListNeutral.addEventListener('drop', handleDrop);

function handleDragStart(event) {
    draggedItem = event.target;
    // event.dataTransfer.effectAllowed = 'move';
    // event.dataTransfer.setData('text/html', draggedItem.innerHTML);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const targetItem = event.target;
    if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
    //   if (event.clientY > targetItem.getBoundingClientRect().top + (targetItem.offsetHeight / 2)) {
    //     targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    //   } else {
    //     targetItem.parentNode.insertBefore(draggedItem, targetItem);
    //   }

        targetItem.parentNode.prepend(draggedItem);
    }
    draggedItem = null;
    saveToLocalStorage();    

}
