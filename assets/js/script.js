// variable to assign a unique id to each task created by the user
var taskIdCounter = 0;

// find objects within the document and select them. save them as variables to use later
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];


// function that will create an object (task), and send it to createTaskEl
var taskFormHandler = function(event) {
    event.preventDefault();
    
    // search for task name and task type inputs within the DOM
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty (validate)
    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
    };

    // resets form after each task entry
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // creates a boolean to test if the current form element is an edited or new task
    var isEdit = formEl.hasAttribute("data-task-id");
    
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    
    //no data attribute, so create object as normal and pass to createTaskEl function
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
  
    createTaskEl(taskDataObj);
    };
};


// recieves objects from taskFormHandler and dynamically creates elements 
var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    // give it a class
    listItemEl.className = "task-item";
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name 
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // adding the counter id to our taskDataObj object
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // save a task to localstorage
    saveTasks();

    // increase task counter for next unique id
    taskIdCounter++;
};


// dynamically creating buttons on each task
var createTaskActions = function(taskId) {
    // create a container dynamically to hold elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // append edit button to created task
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    // append delete button to created task
    actionContainerEl.appendChild(deleteButtonEl);

    // create dropdown 
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    actionContainerEl.appendChild(statusSelectEl);
    
    // creating dropdown status options array
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // dynamically create a different option for each title in the array
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    };
    return actionContainerEl;
};


// function that manages the buttons on each created task
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    
    // delete button was clicked
    } else if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    };
};


// function to edit a task
var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // write values of taskname and tasktype to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    // tell user that the form is now in "edit mode"
    formEl.querySelector("#save-task").textContent = "Save Task";
};


// function to complete editing a task
var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        };
    };

    // save a task to localstorage
    saveTasks();

    alert("Task Updated!");

    // remove data attribute from form
    formEl.removeAttribute("data-task-id");
    // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    document.querySelector("#save-task").textContent = "Add Task";
};


// function to delete a task
var deleteTask = function(taskId) {
    // find task list element with taskId value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i] doesn't match the value of taskId, let's keep that task
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        };
    };

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // save a task to localstorage
    saveTasks();
};


// function to change the status of a task with the dropdown menu
var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert it to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // if user selects "To Do", move to "To Do" section
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);

    // if user selects "In Progress", move to "In Progress" section
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);

    // if user selects "Completed", move to "Completed" section
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    };

    // update the tasks in the tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        };
    };

    // save a task to localstorage
    saveTasks();
};


// function to store tasks to a user's localStorage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};


// create a new task
formEl.addEventListener("submit", taskFormHandler);
// for edit and delete button functionality on each task
pageContentEl.addEventListener("click", taskButtonHandler);
// for changing the status of each task
pageContentEl.addEventListener("change", taskStatusChangeHandler);