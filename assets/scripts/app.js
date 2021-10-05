const themeSwitcher = document.getElementById("theme");
const logTodoBtn = document.getElementById('log-todo');
const clearCompTodoBtn = document.getElementById("clear-completed");

const todoInput = document.getElementById('todo-input');
const todoListParent = document.getElementById("todolist");

const allListBtn = document.getElementById("sort-all");
const activeListBtn = document.getElementById("sort-active");
const completedListBtn = document.getElementById("sort-completed");


const todoListArray = [];

window.onload = () => {
    allListBtn.checked = true
}

const renderActiveTask = () => {
    todoListArray.filter(item => item.tdStatus === true).forEach(item =>{
        document.getElementById(item.id).closest("li").style.display="none"
    });
    todoListArray.filter(item => item.tdStatus === false).forEach(item =>{
        document.getElementById(item.id).closest("li").style.display="block"
    });

}

const renderCompletedTask = () => {
    todoListArray.filter(item => item.tdStatus === false).forEach(item =>{
        document.getElementById(item.id).closest("li").style.display="none"
    });
    todoListArray.filter(item => item.tdStatus === true).forEach(item =>{
        document.getElementById(item.id).closest("li").style.display="block"
    });
}
const renderAllTask = () => {
    todoListArray.forEach(item =>{
        document.getElementById(item.id).closest("li").style.display="block"
    })
}

const removeCompletedItems = () => {
    
    todoListParent.querySelectorAll('input[type="checkbox"]:checked').forEach(item => {
        item.closest("li").remove()
    })
}

const removeIndividualItem = (todoInput,list) => {
    todoListArray.splice(todoListArray.indexOf(todoInput),1);
    activeTodoCount();
    list.parentElement.removeChild(list);
}

const activeTodoCount = () => {
    let count = todoListArray.filter(item => item.tdStatus === false).length
    document.getElementById("items-left").innerText = `${count}`
}

const changeCheckedStatus = (checkBox,todoItem) => {
    
    if (checkBox.checked === true){
        todoItem.tdStatus = true
    }
    if (checkBox.checked === false){
        todoItem.tdStatus = false
    }
    activeTodoCount()
}

const addTodoToList = (todoItem) => {
    let newItem = document.createElement("li");
    newItem.className="todolist-item";
    newItem.id=`${todoItem.id}`;
    newItem.innerHTML=`
    <div >
        <input type="checkbox" name=${todoItem.value} id=${todoItem.checkId}>
        <label for=${todoItem.checkId}>${todoItem.value}</label>
        <span class="cancel-btn"></span>
    </div>
    `
    let checkBox = newItem.querySelector("input");
    checkBox.addEventListener("click",changeCheckedStatus.bind(null, checkBox, todoItem));

    let removeOne = newItem.querySelector("span");
    removeOne.addEventListener("click", removeIndividualItem.bind(null, todoItem, newItem));
    
    todoListParent.append(newItem);
}

const getTodoInput = () => {
    const inputValue = todoInput.value;
    const randomId = Math.random().toString(36).substr(9);

    if (inputValue.trim === "") {
        alert("You have not entered any Thing to be done");
        return
    }

    let todoItem = {
        id: randomId,
        value: inputValue,
        tdStatus: false,
        checkId: randomId + "c"
    }

    todoListArray.push(todoItem);
    activeTodoCount();
    addTodoToList(todoItem);
}
const clearInput = () => {
    todoInput.value = ""
}

const removeCompletedTodoHandler = () => {
    removeCompletedItems();
    activeTodoCount();
}

const inputLogHandler = (e) => {
    e.preventDefault();
    getTodoInput();
    clearInput();
}

const switchHandler = () => {
    if (themeSwitcher.checked){
        document.documentElement.setAttribute('data-theme', 'light');
    }else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}


completedListBtn.addEventListener("click", renderCompletedTask);
activeListBtn.addEventListener("click", renderActiveTask);
allListBtn.addEventListener("click", renderAllTask);
clearCompTodoBtn.addEventListener("click", removeCompletedTodoHandler);
logTodoBtn.addEventListener("click", inputLogHandler);
themeSwitcher.addEventListener("click", switchHandler);


