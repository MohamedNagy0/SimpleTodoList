//html elements
const taskName = document.querySelector(".taskName");
const taskMessage = document.querySelector(".taskMessage");
const addBtn = document.querySelector(".addBtn");
const taskContainer = document.querySelector(".taskContainer");
const editBtn = document.querySelector(".editBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const errorMessage = document.querySelector(".errorMessage");
const updateBtn = document.querySelector(".updateBtn");
const clearAllContainer = document.querySelector(".clearAllContainer");
const clearAllTasks = document.querySelector(".clearAllTasks");
const searchInput = document.querySelector(".searchInput");
const listCount = document.querySelector(".listCount");
const checkedCount = document.querySelector(".checkedCount");
const checkedContainer = document.querySelector(".checkedContainer");

//variables , global functionsCalling and conditions
let currentIndex;

let count = 0;
if (localStorage.getItem("checkedCount")) {
    count = JSON.parse(localStorage.getItem("checkedCount"));
}

let taskList = [];

if (localStorage.getItem("taskList")) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

displayTaskList(taskList);

//function
function addTask() {
    const TaskDetails = {
        name: taskName.value,
        message: taskMessage.value,
    };
    taskList.push(TaskDetails);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTaskList(taskList);
    clearAllInputs();
}

function displayTaskList(arr) {
    taskContainer.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
        taskContainer.innerHTML += `<article class="col-12 rounded-5 px-4 py-3 shadow tr-400 ${
            arr[i].checked ? "bg-gray" : "arrColor"
        }  task${i}">
                        <header
                            class="d-flex  justify-content-between align-items-start my-2"
                        >

                        
                        <div class="d-flex align-items-center gap-3">
                        ${
                            arr[i].checked
                                ? `<label class="pointer" for="${i}">
                        <i class="fa-solid  fa-circle-check checkedColor fs-14"></i>
                        </label>`
                                : `<label class="pointer" for="${i}">
                        <i class="fa-regular fa-circle  fs-14 titleColor"></i>
                        </label>`
                        }
            
                        <input class=" d-none"  type="checkbox" id="${i}" onClick="checkbox(${i})">
                            <h2 class="h6 mb-0  ${
                                arr[i].checked
                                    ? "checkedStyle bg-gray"
                                    : " titleColor "
                            } ">${arr[i].name}</h2>
                        </div>
                        
                           
                            <div class="d-flex align-items-center gap-2">
                                 ${
                                     arr[i].checked
                                         ? ""
                                         : `<i onClick="fillInputOnEditAndHiddenAddBtn(${i})"

                                    class="editBtn fa-regular fa-pen-to-square editColor fs-14 pointer"
                                ></i>`
                                 }
                            
                                <i onClick="deleteOneTask(${i})" class="deleteBtn  pointer fa-regular fa-circle-xmark tr-400 text-danger"></i>
                            </div>
                        </header>
                        <p class="fs-14 w-100  mb-0 mt-3 ml-34 ${
                            arr[i].checked ? "checkedStyle" : "noteColor"
                        }">
                        ${arr[i].message}
                        </p>
                    </article>`;
    }

    for (i = 0; i < arr.length; i++) {
        if (taskList[i].checked) {
            document
                .getElementById(`${i}`)
                .setAttribute("checked", `${taskList[i].checked}`);
        }
    }
    showAndDisableClearAllBtnAndSearchInput();
    listCount.innerHTML = `${taskList.length}`;
    checkedCount.innerHTML = count;
    localStorage.setItem("checkedCount", JSON.stringify(count));
}

function deleteOneTask(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            if (taskList[index].checked == true) {
                count -= 1;
                checkedCount.innerHTML = count;
                localStorage.setItem("checkedCount", JSON.stringify(count));
            }
            taskList.splice(index, 1);
            localStorage.setItem("taskList", JSON.stringify(taskList));
            displayTaskList(taskList);
        }
    });
}

function deleteAllTasks() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            taskList = [];
            localStorage.setItem("taskList", JSON.stringify(taskList));
            displayTaskList(taskList);

            count = 0;
            localStorage.setItem("checkedCount", JSON.stringify(count));
            checkedCount.innerHTML = count;

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        }
    });
}

function fillInputOnEditAndHiddenAddBtn(index) {
    currentIndex = index;
    taskName.value = taskList[index].name;
    taskMessage.value = taskList[index].message;
    addBtn.classList.add("d-none");
    updateBtn.classList.replace("d-none", "d-block");
    taskName.focus();
}

function updateOneTask() {
    taskList[currentIndex].name = taskName.value;
    taskList[currentIndex].message = taskMessage.value;
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTaskList(taskList);
    clearAllInputs();
}

function clearAllInputs() {
    taskName.value = "";
    taskMessage.value = "";
}

//also remove ("checkedCount");
function showAndDisableClearAllBtnAndSearchInput() {
    if (taskList.length > 1) {
        clearAllContainer.innerHTML = `<button onClick="deleteAllTasks()" type="button" class="btn fs-14 btn-danger">Clear All Tasks</button>`;
        searchInput.classList.replace("d-none", "d-block");
    } else {
        localStorage.setItem("checkedCount", count);
        clearAllContainer.innerHTML = "";
        searchInput.classList.replace("d-block", "d-none");
    }
    if (taskList.length >= 1) {
        checkedContainer.classList.replace("d-none", "d-block");
    } else {
        checkedContainer.classList.replace("d-block", "d-none");
    }
}

function checkbox(index) {
    if (document.getElementById(`${index}`).checked == true) {
        taskList[index].checked = true;
        localStorage.setItem("taskList", JSON.stringify(taskList));

        count += 1;
        localStorage.setItem("checkedCount", JSON.stringify(count));
        checkedCount.innerHTML = count;
        displayTaskList(taskList);
    } else {
        taskList[index].checked = false;
        localStorage.setItem("taskList", JSON.stringify(taskList));

        count -= 1;
        localStorage.setItem("checkedCount", JSON.stringify(count));
        checkedCount.innerHTML = count;
        displayTaskList(taskList);
    }
}
//events

addBtn.addEventListener("click", function () {
    if (taskName.value != "") {
        addTask();
        errorMessage.classList.replace("d-block", "d-none");
    } else {
        errorMessage.classList.replace("d-none", "d-block");
    }
});

updateBtn.addEventListener("click", function () {
    if (taskName.value != "") {
        updateOneTask();
        errorMessage.classList.replace("d-block", "d-none");
        updateBtn.classList.replace("d-block", "d-none");
        addBtn.classList.replace("d-none", "d-block");
    } else {
        errorMessage.classList.replace("d-none", "d-block");
    }
});

searchInput.addEventListener("input", function () {
    let filletedTasks = [];
    for (let i = 0; i < taskList.length; i++) {
        if (
            taskList[i].name
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        ) {
            filletedTasks.push(taskList[i]);
        }
    }
    console.log(filletedTasks);

    displayTaskList(filletedTasks);
});
