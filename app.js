// define our ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListener();

function loadEventListener() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
         // create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // create text node and append it to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
        return;
    }
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // store in ls
    storeTaskInLocalStorage(taskInput.value);
    // clear the input value
    taskInput.value = "";
    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();
            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        } 
    }
}
function removeTaskFromLocalStorage(taskToRemove) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if(taskToRemove.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTasks() {
    // taskList.innerHTML = '';
    // faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        // clear Local Storage
        localStorage.clear();
    }
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }
        else {
            task.style.display = 'none';
        }
    });
}