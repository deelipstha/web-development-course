
"use strict";

// Find the HTML elements we need
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const taskCount = document.getElementById("taskCount");

// Load saved tasks from the browser
let tasks = [];

try {
    const savedTasks = localStorage.getItem("myDailyTasks");
    tasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (!Array.isArray(tasks)) {
        tasks = [];
    }
} catch (error) {
    tasks = [];
}

// Save the current tasks in the browser
function saveTasks() {
    localStorage.setItem("myDailyTasks", JSON.stringify(tasks));
}

// Show an error message and highlight the input
function showError(message) {
    errorMessage.textContent = message;
    taskInput.classList.add("invalid");
    taskInput.setAttribute("aria-invalid", "true");
}

// Remove the error message and highlight
function clearError() {
    errorMessage.textContent = "";
    taskInput.classList.remove("invalid");
    taskInput.removeAttribute("aria-invalid");
}

// Update the number of unfinished tasks
function updateTaskCount() {
    const unfinishedTasks = tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        `You have ${unfinishedTasks} unfinished task${unfinishedTasks === 1 ? "" : "s"}.`;
}

// Display all tasks on the page
function renderTasks() {
    taskList.replaceChildren();

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No tasks yet. Add your first task above!";
        taskList.appendChild(emptyMessage);
    }

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        // Checkbox to mark a task as complete
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        // Task text
        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        // Button to delete a task
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        listItem.append(checkbox, taskText, deleteButton);
        taskList.appendChild(listItem);
    });

    updateTaskCount();
}

// Add a new task when the form is submitted
taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Check for empty or very short tasks
    if (taskText.length === 0) {
        showError("Please enter a task.");
        taskInput.focus();
        return;
    }

    if (taskText.length < 3) {
        showError("Your task must have at least 3 characters.");
        taskInput.focus();
        return;
    }

    // Create and save the new task
    const newTask = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    clearError();
    taskInput.focus();
});

// Clear the error when the user starts typing
taskInput.addEventListener("input", clearError);

// Display saved tasks when the page opens
renderTasks();
