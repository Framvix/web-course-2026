let tasks = [];
let nextId = 1;
let currentFilter = "all";

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const remainingCount = document.querySelector("#remaining");
const completedCount = document.querySelector("#completed");
const filterButtons = document.querySelectorAll("[data-filter]");

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        return;
    }

    tasks.push({ id: nextId, text: text, completed: false });
    nextId++;
    taskInput.value = "";
    render();
    taskInput.focus();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    render();
}

function updateCounters() {
    const completed = tasks.filter(task => task.completed).length;
    remainingCount.textContent = tasks.length - completed;
    completedCount.textContent = completed;
}

function render() {
    taskList.replaceChildren();
    const visibleTasks = tasks.filter(task => {
        if (currentFilter === "active") {
            return !task.completed;
        }
        if (currentFilter === "completed") {
            return task.completed;
        }
        return true;
    });

    visibleTasks.forEach(task => {
        const item = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const text = document.createElement("span");
        const deleteButton = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));
        text.textContent = task.text;
        if (task.completed) {
            text.classList.add("completed");
        }
        deleteButton.type = "button";
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        label.append(checkbox, text);
        item.append(label, deleteButton);
        taskList.append(item);
    });

    filterButtons.forEach(button => {
        button.setAttribute("aria-pressed", button.dataset.filter === currentFilter);
    });
    updateCounters();
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();
    addTask();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        render();
    });
});

render();
