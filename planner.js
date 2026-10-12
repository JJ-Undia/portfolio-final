const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const msg = document.getElementById("taskMsg");
const count = document.getElementById("count");

// tasks live in an array and are saved so they survive a page refresh
let tasks = [];
try { tasks = JSON.parse(localStorage.getItem("tasks")) || []; } catch (e) { tasks = []; }

function save() {
  try { localStorage.setItem("tasks", JSON.stringify(tasks)); } catch (e) {}
}

function render() {
  list.innerHTML = "";
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = task.done;
    box.setAttribute("aria-label", "Mark complete: " + task.text);
    box.addEventListener("change", function () { toggleTask(task.id); });

    const label = document.createElement("span");
    label.textContent = task.text;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", function () { deleteTask(task.id); });

    li.append(box, label, del);
    list.appendChild(li);
  });
  const left = tasks.filter(function (t) { return !t.done; }).length;
  count.textContent = tasks.length === 0
    ? "No tasks yet. Add your first one above."
    : left + " of " + tasks.length + " tasks still to do";
}

function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  save(); render();
}
function toggleTask(id) {
  tasks = tasks.map(function (t) { return t.id === id ? { id: t.id, text: t.text, done: !t.done } : t; });
  save(); render();
}
function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  save(); render();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") { msg.textContent = "Type a task before adding it."; return; }
  msg.textContent = "";
  addTask(text);
  input.value = "";
  input.focus();
});
render();
