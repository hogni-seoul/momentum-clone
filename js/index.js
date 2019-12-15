const time = document.querySelector(".js-clock span");
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");

let pendingTasks = [];

function getTaskObj(text) {
  return {
    id: String(Date.now()),
    text: text,
    status: "ongoing"
  };
}

function lockForm() {
  if (document.querySelectorAll("li").length >= 3) {
    toDoInput.disabled = true;
  } else {
    toDoInput.disabled = false;
  }
}

function save() {
  localStorage.setItem("pending", JSON.stringify(pendingTasks));
  lockForm();
}

function paintPendingTasks(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const completeBtn = document.createElement("button");

  span.innerText = " " + task.text + " ";
  span.classList.add(task.status);
  deleteBtn.innerText = "❌";
  completeBtn.innerHTML = "✅";

  deleteBtn.addEventListener("click", function(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
    pendingTasks = pendingTasks.filter(function(toDo) {
      return toDo.id !== li.id;
    });
    save();
  });

  completeBtn.addEventListener("click", function(event) {
    const li = event.target.parentNode;
    const span = li.querySelector("span");
    const liList = document.querySelectorAll("li");
    if (span.className === "ongoing") {
      span.classList.replace("ongoing", "finished");
      task.status = "finished";
      li.parentNode.insertBefore(li, liList[liList.length - 1].nextSibling);
    } else {
      span.classList.replace("finished", "ongoing");
      task.status = "ongoing";
      li.parentNode.insertBefore(li, liList[0]);
    }
    save();
  });

  li.append(completeBtn, span, deleteBtn);
  li.id = task.id;
  pendingList.append(li);
  li.parentNode.insertBefore(li, document.querySelectorAll("li")[0]);
}

function loadTasks() {
  pendingTasks = JSON.parse(localStorage.getItem("pending")) || [];
  const finishedTasks = pendingTasks.filter(function(toDo) {
    return toDo.status === "finished";
  });
  const ongoingTasks = pendingTasks.filter(function(toDo) {
    return toDo.status === "ongoing";
  });
  finishedTasks.forEach(function(task) {
    paintPendingTasks(task);
  });
  ongoingTasks.forEach(function(task) {
    paintPendingTasks(task);
  });
  lockForm();
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  time.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

toDoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const taskObj = getTaskObj(toDoInput.value);
  toDoInput.value = "";
  paintPendingTasks(taskObj);
  pendingTasks.push(taskObj);
  save();
});

function init() {
  getTime();
  setInterval(getTime, 1000);
  loadTasks();
}

init();
