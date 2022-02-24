// find objects within the document and select them. save them as variables to use later
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");


// function that will create a task in "Tasks To Do"
var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};

// on a button click ("Add Task"), callback createTaskHandler (create a task)
buttonEl.addEventListener("click", createTaskHandler);