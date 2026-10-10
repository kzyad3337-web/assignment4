
const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

const taskManager = new TaskManager();

function renderTasks() {
    taskList.innerHTML = "";

    taskManager.tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const titleElement = document.createElement("span");
        titleElement.textContent = task.title;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";

        toggleBtn.addEventListener("click", () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");

        deleteBtn.addEventListener("click", () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        taskElement.appendChild(titleElement);
        taskElement.appendChild(toggleBtn);
        taskElement.appendChild(deleteBtn);

        taskList.appendChild(taskElement);
    });
}

async function loadTasks() {
    statusMessage.textContent = "Loading tasks...";
    loadTasksBtn.disabled = true;

    try {
        const rawTasks = await fetchTasks();

        const jsonTasks = JSON.stringify(rawTasks);

        const parsedTasks = JSON.parse(jsonTasks);

        const tasks = parsedTasks.map(task =>
            new Task(task.id, task.title, task.completed)
        );

        taskManager.setTasks(tasks);
        renderTasks();

        statusMessage.textContent = "";

    } catch (error) {
        statusMessage.textContent = "Failed to load tasks.";
        console.error("Error loading tasks:", error);

    } finally {
        loadTasksBtn.disabled = false;
    }
}

loadTasksBtn.addEventListener("click", loadTasks);
