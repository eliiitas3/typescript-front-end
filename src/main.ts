import { v4 } from "uuid";
import Toastify from "toastify-js";

import "toastify-js/src/toastify.css";
import "./input.css";

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const tasksList = document.querySelector<HTMLDivElement>("#taskList");

interface Tasks {
  id: string;
  tittle: string;
  description: string;
}

let tasks: Tasks[] = [];

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const tittle = taskForm["tittle"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  tasks.push({
    tittle: tittle.value,
    description: description.value,
    id: v4(),
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  Toastify({
    text: "Task added",
  }).showToast();
  renderTasks(tasks);
  taskForm.reset();
  tittle.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  renderTasks(tasks);
});

function renderTasks(tasks: Tasks[]) {
  tasksList!.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className =
      "bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer";

    const header = document.createElement("header");
    header.className = "flex justify-between items-center";
    const tittle = document.createElement("span");
    tittle.innerText = task.tittle;

    const btnDelete = document.createElement("button");
    btnDelete.className = "bg-red-500 px-2 py-1 rounded-md";
    btnDelete.innerText = "Delete";

    btnDelete.addEventListener("click", (e) => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(tasks);
    });

    header.append(tittle);
    header.append(btnDelete);

    const description = document.createElement("p");
    description.innerText = task.description;

    taskElement.append(header);
    taskElement.append(description);
    const id = document.createElement("p");
    id.innerText = task.id;
    id.className = "text-gray-400 text-xs";
    tasksList?.append(taskElement);
    taskElement.append(id);
  });
}
