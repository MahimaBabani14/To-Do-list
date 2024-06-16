let listcontainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');

document.querySelector('.filter-todo').addEventListener('change', filterTasks);
loadTasks();

function addTask() {
    if (inputBox.value === '') {
        alert('Add your Task');
    } else {
        let task = document.createElement('li');
        task.textContent = inputBox.value;
        task.addEventListener('click', toggleTask);
        
        let span = document.createElement('span');
        span.textContent = '\u{1F5D1}';
        span.addEventListener('click', removeTask);
        task.appendChild(span);

        listcontainer.appendChild(task);
    }
    inputBox.value = '';
    saveData();
    updateTaskCount();
}

function toggleTask(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        saveData();
        updateTaskCount();
    }
}

function removeTask(event) {
    if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
        saveData();
        updateTaskCount();
    }
}


function saveData(){
    localStorage.setItem("tasks", listcontainer.innerHTML)
    }
    
   

function showData() {
    listcontainer.innerHTML = localStorage.getItem('tasks') || '';
    document.querySelectorAll('#list-container li').forEach(task => {
        task.addEventListener('click', toggleTask);
        task.querySelector('span').addEventListener('click', removeTask);
    });
    updateTaskCount();
}

showData();

function filterTasks(event) {
    const filter = event.target.value;
    const tasks = document.querySelectorAll('#list-container li');
    
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'list-item';
                break;
            case 'Completed':
                task.style.display = task.classList.contains('checked') ? 'list-item' : 'none';
                break;
            case 'Incomplete':
                task.style.display = task.classList.contains('checked') ? 'none' : 'list-item';
                break;
        }
    });
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        let task = document.createElement('li');
        task.textContent = taskData.text;
        if (taskData.completed) {
            task.classList.add('checked');
        }
        task.addEventListener('click', toggleTask);

        let span = document.createElement('span');
        span.textContent = '\u{1F5D1}';
        span.addEventListener('click', removeTask);
        task.appendChild(span);

        listcontainer.appendChild(task);
    });
}

function updateTaskCount() {
    const tasks = document.querySelectorAll('#list-container li');
    const completedTasks = document.querySelectorAll('#list-container li.checked');
    document.getElementById('completed-count').textContent = completedTasks.length;
    document.getElementById('incomplete-count').textContent = tasks.length - completedTasks.length;
}

document.querySelector('button').addEventListener('click', addTask);

