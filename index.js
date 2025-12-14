let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти тугормал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list"); //Контейнер задач 
const formElement = document.querySelector(".to-do__form"); // Форма добавления задач
const inputElement = document.querySelector(".to-do__input"); // Поле ввода новой задачи

function loadTasks() {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
        return JSON.parse(savedTasks);
    }
    return items;
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;

    deleteButton.addEventListener("click", function() {
        clone.remove();
        items = getTasksFromDOM();
        saveTasks(items);
    });

    // Обработчик для кнопки копирования
    duplicateButton.addEventListener("click", function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        items = getTasksFromDOM();
        saveTasks(items);
    });

    // Обработчик для кнопки редактирования
    editButton.addEventListener("click", function() {
        textElement.setAttribute("contenteditable", "true");
        textElement.focus();
    });

    textElement.addEventListener("blur", function() {
        textElement.setAttribute("contenteditable", "false");
        items = getTasksFromDOM();
        saveTasks(items);
    });

    textElement.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            textElement.blur();
        }
    });

    return clone;
}

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];
    
    itemsNamesElements.forEach(function(element) {
        tasks.push(element.textContent);
    });
    
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Загрузка задач при старте 
items = loadTasks();

items.forEach(function(item) {
    const newItem = createItem(item);
    listElement.append(newItem);
});

// отправка формы
formElement.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const taskText = inputElement.value.trim();
    
    if (taskText) {
        const newItem = createItem(taskText);
        listElement.prepend(newItem);
        
        // Обновляем и сохраняем задачи
        items = getTasksFromDOM();
        saveTasks(items);
        
        inputElement.value = "";
    }
});

