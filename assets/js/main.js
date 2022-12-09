const contentNewTask = document.querySelector('#contentNewTask');
const addTask = document.querySelector("#addTask");
const changeTextTask = document.querySelector('#changeTextTask');

var counterTask = 0;
const taskForm = document.querySelector("#taskForm");
var newTask;

addTask.addEventListener("click", function() {
    if(contentNewTask.value != "") {
        newTask = `
                <div class="taskContainer flex-r">
                    <div class="row0 flex-r">
                        <input type="checkbox" name="task${counterTask}" id="task${counterTask}" class="task${counterTask}">
                        <label for="task${counterTask}">${contentNewTask.value}</label>
                    </div>
                    <div class="row1 flex-r">
                        <div class="editBtn"><i  id="editBtn" class="fa-sharp fa-solid fa-pen"></i></div>
                        <div class="removeBtn"><i id="removeBtn" class="fa-solid fa-xmark"></i></div>
                    </div>
                </div>
                `
        taskForm.innerHTML += newTask;
        counterTask++; /* -- pour changer l'id, name et le class de chaque task -- */
        contentNewTask.value = ""; /* --- pour effacer ce qu'on a écrit déja -- */
    }
})


taskForm.addEventListener("click", function(e) {
    const removeBtn = document.querySelector("#removeBtn");
    const editBtn = document.querySelector("#editBtn");

    const taskRow0 = document.querySelector(".row0");

    // editBtn.addEventListener("click", function(e) {
    //     console.log(e.path)
    // })
    var inpChangeCntTask = `
                            <input type="text" id="changeTextTask" name="changeTextTask" class="changeTextTask" value="${taskRow0.lastElementChild.textContent}"></input>
                        `
    if(e.path[0].id == "editBtn") {
        taskRow0.removeChild(taskRow0.lastChild);
        taskRow0.innerHTML += inpChangeCntTask;
    }
    if(e.path[0].id == "removeBtn") {
        // taskForm.removeChild(taskForm.lastChild)
        // this.remove()
        e.path[3].remove();
    }

    
})

// function searchElement(e) {
//     for(var i = 0; i < taskForm.childElementCount; i++) {
//         console.log(taskForm[i])
//     }
// }