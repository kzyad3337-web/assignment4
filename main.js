
const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

const taskManager = new TaskManager();

function renderTasks() {
    taskList.innerHTML = "";
 if (taskManager.tasks.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No tasks available.";

    taskList.appendChild(emptyMessage);
    return;
  }
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

        toggleBtn.setAttribute(
        "aria-label",
        `Toggle ${task.title}`
   );


        toggleBtn.addEventListener("click", () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

             deleteBtn.setAttribute(
             "aria-label",
             `Delete ${task.title}`
        );
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

      if (tasks.length === 0) {
      statusMessage.textContent = "No tasks found.";
    } else {
      statusMessage.textContent = "Tasks loaded successfully.";
    }
     } catch (error) {
        statusMessage.textContent = "Failed to load tasks. please try agaın";
        console.error("Error loading tasks:", error);

     } finally {
        loadTasksBtn.disabled = false;
    }
}

loadTasksBtn.addEventListener("click", loadTasks);
