document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Load dark mode state from localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }

  // Dark Mode Toggle
  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
    );
  });

  // Add Task
  const addTaskAction = () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    addTaskToList(taskText);
    taskInput.value = "";
    saveTasks();
  };

  addTaskBtn.addEventListener("click", () => {
    addTaskAction();
  });

  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTaskAction();
    }
  });

  // Function to add task
  const addTaskToList = (taskText) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    // Setup checkbox
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("change", () => {
      li.classList.toggle("completed");
    });

    // Setup Span
    span.textContent = taskText;
    span.addEventListener("click", () => {
      li.classList.toggle("completed");
      checkbox.checked = !checkbox.checked;
      saveTasks();
    });

    // Setup delete button
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    div.appendChild(checkbox);
    li.appendChild(div);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  };

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
      tasks.push({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach((task) => {
      addTaskToList(task.text);
      if (task.completed) {
        taskList.lastChild.classList.add("completed");
      }
    });
  }

  loadTasks();
});
