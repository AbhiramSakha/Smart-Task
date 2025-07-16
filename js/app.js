let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priorityInput").value;
  const text = taskInput.value.trim();

  if (!text) return alert("Please enter a task.");

  tasks.push({ text, priority, done: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const filter = document.getElementById("filterPriority").value;
  list.innerHTML = "";

  tasks
    .filter(task => filter === "All" || task.priority === filter)
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.priority}`;
      li.innerHTML = `
        <span>${task.text} <small>(${task.priority})</small></span>
        <div>
          <button onclick="toggle(${index})">${task.done ? "Undo" : "Done"}</button>
          <button onclick="remove(${index})" style="background:#ef4444;">Delete</button>
        </div>`;
      if (task.done) li.style.textDecoration = "line-through";
      list.appendChild(li);
    });
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function remove(i) {
  if (confirm("Delete this task?")) {
    tasks.splice(i, 1);
    renderTasks();
  }
}

function filterTasks() {
  renderTasks();
}
