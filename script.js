// script.js

document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const newTaskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                ${task.text}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            li.addEventListener('click', () => toggleTaskCompletion(index));
            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask(text) {
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Function to toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            addTask(newTask);
            newTaskInput.value = '';
        }
    });

    // Event listener for delete buttons
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            deleteTask(index);
        }
    });

    // Initial render
    renderTasks();
});
