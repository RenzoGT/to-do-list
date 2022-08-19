"use strict";

const inputEl = document.getElementById("todo-input"),
  addButton = document.getElementById("add-button"),
  divList = document.getElementById("list");

let storeTodos = JSON.parse(localStorage.getItem("todos")) || [];

const createTask = (task) => {
  const itemDiv = document.createElement("div"),
    taskText = document.createElement("p"),
    buttonBox = document.createElement("div"),
    doneButton = document.createElement("button"),
    deleteButton = document.createElement("button");

  itemDiv.setAttribute("id", "list-item");

  taskText.innerText = captalizeFirstLetter(task);

  buttonBox.setAttribute("class", "button-box");

  doneButton.setAttribute("id", "done-button");
  doneButton.innerText = "✔️";

  deleteButton.setAttribute("id", "delete-button");
  deleteButton.innerText = "❌";

  [doneButton, deleteButton].forEach((button) => {
    buttonBox.append(button);
  });

  [taskText, buttonBox].forEach((element) => {
    itemDiv.append(element);
  });

  divList.append(itemDiv);
};

const captalizeFirstLetter = (myString) => {
  const firstLetter = myString[0];

  const remaining = myString.substring(1);

  return firstLetter.toUpperCase() + remaining;
};

addButton.addEventListener("click", () => {
  const inputValue = inputEl.value;

  if (inputValue.length != 0) {
    createTask(inputValue);

    inputEl.value = "";

    storeTodos.push(inputValue);
    localStorage.setItem("todos", JSON.stringify(storeTodos));
  }
});

window.addEventListener("click", (evt) => {
  if (evt.target.id == "done-button" || evt.target.id == "delete-button") {
    let targetBiggerParent = evt.target.parentElement.parentElement;
    let targetTodo = evt.target.parentElement.previousSibling.innerText;

    let currentStorage = JSON.parse(localStorage.getItem("todos"));
    let foundItem = storeTodos.indexOf(targetTodo.toLowerCase());

    if (foundItem == 0) {
      currentStorage.splice(0, 1);
    } else {
      currentStorage.splice(foundItem, foundItem);
    }

    storeTodos = currentStorage;

    localStorage.setItem("todos", JSON.stringify(storeTodos));

    targetBiggerParent.classList.add("disappear");

    setTimeout(() => {
      targetBiggerParent.remove();
    }, 300);
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("todos")) {
    JSON.parse(localStorage.getItem("todos")).forEach((todo) => {
      createTask(todo);
    });
  }
});
