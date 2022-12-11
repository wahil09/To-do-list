const contentNewTask = document.querySelector('#contentNewTask');
const addTask = document.querySelector("#addTask");
const changeTextTask = document.querySelector('#changeTextTask');
const btnRemoveAllTask = document.querySelector("#btnRemoveAllTask")
const btnRemoveSelectedTask = document.querySelector("#btnRemoveSelectedTask")
var counterTask = 0;
const containerAllTasks = document.querySelector("#containerAllTasks");
var newTask;
var taskArray = [];


if(window.localStorage.getItem('tasks')) {
    taskArray = JSON.parse(window.localStorage.getItem('tasks'));
}

addTask.addEventListener("click", function() {
    if(contentNewTask.value != "") {
        const dataTask = {
            text: contentNewTask.value,
            id: Date.now(),
            status: false,
            editable: false,
        };
        taskArray.push(dataTask);
        uploadTaskContainer();
    }
})

function uploadTaskContainer() {
    containerAllTasks.innerHTML = "";
    var checkIfTaskStatusTrue = false;
    var checkIfTaskEditableTrue = false
    if(taskArray.length) {
        btnRemoveAllTask.classList.remove("hidden"); // Afficher le boutton Remove all task
        taskArray.forEach(task => {
            const parent = document.createElement('div');
            parent.classList.add('task', 'flex-r');
            parent.setAttribute("data_id", `${task.id}`);

            const row1 = document.createElement("div");
            row1.classList.add("row0", "flex-r");
            /*  ---- Input checkbox ---- */
            const input = document.createElement("input");
            input.type = "checkbox";
            input.name = `task${counterTask}`;
            input.id = `task${counterTask}`;
            input.classList.add(`checkbox`);

            /* -------- cocher la checkbox si son status est true ----------- */
            // input.checked = true ? task.status : input.checked = false;
            if(task.status) {
                input.checked = true;
                checkIfTaskStatusTrue = true;
                row1.style.textDecoration = "line-through";
            } else {
                input.checked = false;
            }



            /* ---- Span ----- */
            const span = document.createElement("span");
            span.id = `textTask`;
            span.classList.add(`textTask`);
            span.setAttribute("contenteditable", `${task.editable}`);
            span.setAttribute("spellcheck", "true");
            span.textContent = `${task.text}`;

            /* ------ Append child ------ */
            row1.appendChild(input);
            row1.appendChild(span);

            const row2 = document.createElement("div");
            row2.classList.add("row1", "flex-r");

            /* ----- create two div ---- */
            /* -- div 1 -- */
            const div1 = document.createElement("div");
            div1.classList.add("editBtn");
            /* -- div 2 -- */
            const div2 = document.createElement("div");
            div2.classList.add("removeBtn");

            /* -- create remove/edit button -- */
            const editBtn = document.createElement('i');
            editBtn.id = 'editBtn';
            editBtn.classList.add('fa-sharp', 'fa-solid', 'fa-pen');
            const removeBtn = document.createElement('i');
            removeBtn.id = 'removeBtn';
            removeBtn.classList.add('fa-solid', 'fa-xmark');

            /* ------ Append child ------ */
            div1.appendChild(editBtn);
            div2.appendChild(removeBtn);
            row2.appendChild(div1)
            row2.appendChild(div2)

            
            /* ------------- Append grand child ------------- */
            contentNewTask.value = ""; /* --- pour effacer ce qu'on a écrit déja -- */
            parent.appendChild(row1)
            parent.appendChild(row2)
            containerAllTasks.appendChild(parent)
            counterTask++; /* -- pour changer l'id, name et le class de chaque task -- */
    

            // check si l'attribute editable est true 
            if(task.editable) {
                span.classList.add("editable");
                editBtn.classList = "fa-solid fa-check";
            } else {
                span.classList.remove("editable");
                editBtn.classList = "fa-sharp fa-solid fa-pen";
            }

            /* ------- set Data To Locale Storage --------- */
            setTasksToLocaleStorage(taskArray);
        })
        if(checkIfTaskStatusTrue) {
            // Afficher le boutton Remove task Selected
            btnRemoveSelectedTask.classList.remove("hidden"); 
        } else {
            btnRemoveSelectedTask.classList.add("hidden"); // supprimer le boutton Remove task Selected
        }
    } else {
        setTasksToLocaleStorage(taskArray);
        btnRemoveAllTask.classList.add("hidden"); // supprimer le boutton Remove all task
        btnRemoveSelectedTask.classList.add("hidden"); // supprimer le boutton Remove task Selected
    }
}

// task clicked
containerAllTasks.addEventListener('click', function(e) {
    if(e.target.parentElement.classList.contains("removeBtn")) {
        var taskId = e.target.parentElement.parentElement.parentElement.getAttribute("data_id");
        deleteTaskFromTaskArray(taskId);
    // For checked task
    } else if(e.target.classList.contains('checkbox')) {
        var taskId = e.target.parentElement.parentElement.getAttribute("data_id");
        changeStatusTask(taskId);
    }
})

// btn edit task clicked
containerAllTasks.addEventListener("click", (e) => {
    if(e.target.parentElement.classList.contains("editBtn")) {
        var taskId = e.target.parentElement.parentElement.parentElement.getAttribute("data_id");
        var contentText = e.target.parentElement.parentElement.parentElement.firstChild.lastChild.textContent;
        changeTypeTaskToTaskEditable(taskId, contentText);
    }
})


// Delete task
function deleteTaskFromTaskArray(taskId) {
    var newTaskArray = [];
    for(var task of taskArray) {
        if(task.id != taskId) {
            newTaskArray.push(task);
        }
    }
    taskArray = newTaskArray;
    uploadTaskContainer();
}

// Change status task
function changeStatusTask(idTask) {
    for(var task of taskArray) {
        if(task.id == idTask) {
            if(task.status) {
                task.status = false;
            } else {
                task.status = true;
            }
        }
    }
    uploadTaskContainer();
}

// set to locale storage
function setTasksToLocaleStorage(arrayTask) {
    var objToStr = JSON.stringify(arrayTask);
    window.localStorage.setItem("tasks", objToStr);
}

// Function Remove all task
function removeAllTask() {
    taskArray = [];
    setTasksToLocaleStorage(taskArray);
    uploadTaskContainer();value
}

// Function remove task selected
function removeSelectedTask() {
    var newTaskArray = [];
    for(var task of taskArray) {
        if(!task.status) {
            newTaskArray.push(task);
        }
    }
    taskArray = newTaskArray;
    uploadTaskContainer();
}

// Changer le type de task to task editable
function changeTypeTaskToTaskEditable(idTask, newTaskContent) {
    taskArray.forEach(task => {
        if(task.id == idTask) {
            if(task.editable) {
                task.editable = false;
                task.text = newTaskContent;
            } else {
                task.editable = true
            }
        } else {
            task.editable = false;
        }
    })
    uploadTaskContainer();
}

// return all edit task attributs to false pour la premiere fois
function returnAllEditAttributTaskToFalse() {
    taskArray.forEach(task => {
        task.editable = false
    })
    uploadTaskContainer();
}
returnAllEditAttributTaskToFalse();
uploadTaskContainer();

/* ---------------- Edit Task ---------------- */
// containerAllTasks.addEventListener('click', function(e) {
//     const textTask = document.querySelector('#textTask');
//     const editBtn = document.querySelector("#editBtn");
//     editBtn.addEventListener('click', () => {
//         textTask.setAttribute("contenteditable", 'true');
//         textTask.focus();
//         textTask.classList.add("editable");
//     })
// })



// newTask = `
// <div class="task flex-r" data_id="${task.id}">
//     <div class="row0 flex-r">
//         <input type="checkbox" name="task${counterTask}" id="task$ {counterTask}""> 
//         <span class="textTask" id="textTask" contenteditable="false" spellcheck="true">${task.text}</span>
//     </div>
//     <div class="row1 flex-r">
//         <div class="editBtn"><i  id="editBtn" class="fa-sharp fa-solid fa-pen"></i></div>
//         <div class="removeBtn"><i id="removeBtn" class="fa-solid fa-xmark"></i></div>
//     </div>
// </div>
// `