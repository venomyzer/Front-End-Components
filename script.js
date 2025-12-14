//1. CALCULATOR

const calcDisplay = document.querySelector('.calculator-display');
const calcButtons = document.querySelectorAll('.calculator-buttons');
const specialChars = ["%","*","/","-","+","="];
let calcOutput = "";

const calculate = (btnValue) => {
    if (btnValue === "=" && calcOutput !== "") {
        calcOutput = eval(calcOutput.replace("%","/100"));
    } else if (btnValue === "AC") {
        calcOutput = "";
    } else if (btnValue === "DEL") {
        calcOutput = calcOutput.toString().slice(0,-1);
    } else {
        if(calcOutput === "" && specialChars.includes(btnValue)) { return;}
        calcOutput = calcOutput+btnValue;
    }
    calcDisplay.value = calcOutput;
}

calcButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        calculate(e.target.dataset.value)
    })
})


//2. TO-DO List

const todoInputField = document.querySelector(".to-do-input textarea");
const todoLists = document.querySelector(".to-do-list");
const todoPendingNum = document.querySelector(".to-do-pending-num");
const todoClearBtn = document.querySelector(".to-do-clear");
const todoAddBtn = document.querySelector(".to-do-add");

function todoUpdatePendingTasks() {
    let todoTasks = document.querySelectorAll(".pending"); //selects all pending list items
    todoPendingNum.textContent = todoTasks.length === 0 ? "no" : todoTasks.length;
}

function toggleTodoAddButton() {
    if (todoInputField.value.trim() === "") {
        todoAddBtn.classList.remove("visible");
    }else {
        todoAddBtn.classList.add("visible");
    }
}
function handleTodoCheckboxStatus(e) {
    const checkbox = e.querySelector("input");
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("pending");
    todoUpdatePendingTasks();
}
function deleteTodoTask(e) {
    e.parentElement.remove();
}

todoInputField.addEventListener("input", toggleTodoAddButton);

todoAddBtn.addEventListener("click", (e) => {
    let todoInputValue = todoInputField.value.trim();
    if (todoInputValue.length >0) {
        console.log("valid");
        let todoListTag = ` <li class="to-do-list-item pending" onclick="handleTodoCheckboxStatus(this)">
                <input type="checkbox" />
                <span class="to-do-task">${todoInputValue}</span>
                <i class="uil uil-trash" onclick="deleteTodoTask(this)"></i>
            </li> `
        todoLists.insertAdjacentHTML("beforeend", todoListTag);
        todoInputField.value="";
        toggleTodoAddButton();
        todoUpdatePendingTasks();
    }
})
todoInputField.addEventListener("keyup", (e) => {
    let todoInputValue = todoInputField.value.trim();
    if (e.key === "Enter" && todoInputValue.length >0) {
        console.log("valid");
        let todoListTag = ` 
                <li class="to-do-list-item pending" onclick="handleTodoCheckboxStatus(this)">
                <input type="checkbox" />
                <span class="to-do-task">${todoInputValue}</span>
                <i class="uil uil-trash" onclick="deleteTodoTask(this)"></i>
                </li>
        `
        todoLists.insertAdjacentHTML("beforeend", todoListTag);
        todoInputField.value = "";
        toggleTodoAddButton();
        todoUpdatePendingTasks();
    }
})

todoClearBtn.addEventListener("click", (e) => {
    todoLists.innerHTML = "";
    todoUpdatePendingTasks();
})


// 3. Temperature Convertor

const celsius = document.querySelector("#t-celsius");
const fahrenheit = document.querySelector("#t-fahrenheit");
const kelvin = document.querySelector("#t-kelvin");

function clearAll() {
    celsius.value = "";
    fahrenheit.value = "";
    kelvin.value = "";
}
function updateFromCelsius() {
    const c = parseFloat(celsius.value);
    if (isNaN(c)) {
        clearAll();
        return;
    }
    fahrenheit.value = ((c * 9) / 5 + 32).toFixed(2);
    kelvin.value = (c + 273.15).toFixed(2);
}
function updateFromFahrenheit() {
    const f = parseFloat(fahrenheit.value);
    if (isNaN(f)) {
        clearAll();
        return;
    }
    const c = ((f - 32) * 5) / 9;
    celsius.value = c.toFixed(2);
    kelvin.value = (c + 273.15).toFixed(2);
}
function updateFromKelvin() {
    const k = parseFloat(kelvin.value);
    if (isNaN(k)) {
        clearAll();
        return;
    }
    const c = k - 273.15;
    celsius.value = c.toFixed(2);
    fahrenheit.value = ((c * 9) / 5 + 32).toFixed(2);
}

celsius.addEventListener("input", updateFromCelsius);
fahrenheit.addEventListener("input", updateFromFahrenheit);
kelvin.addEventListener("input", updateFromKelvin);


// 4. Star Rating

const stars = document.querySelectorAll(".uis-star");
const removeStars = document.querySelector(".star-rating");

stars.forEach((star,index1) => {
    star.addEventListener("click", (e) => {
        stars.forEach((star,index2) => {
            if(index1 >= index2) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }
        })
    });
})
removeStars.addEventListener("click", (e) => {
    if (e.target.classList.contains("uis-star")) { return; }
    stars.forEach((star) => {
        star.classList.remove("active");
    })
});

