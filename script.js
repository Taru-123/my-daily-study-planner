let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function getDate() {
    return new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long"
    });
}

document.getElementById("todayDate").innerText = getDate();

function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function showTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let span = document.createElement("span");
        span.className = "task-text";
        span.innerText = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        checkbox.onchange = function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            showTasks();
        };

        let date = document.createElement("span");
        date.className = "task-date";
        date.innerText = "📅 " + task.date;

        let del = document.createElement("button");
        del.className = "delete-btn";
        del.innerText = "🗑";

        del.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        };

        li.append(checkbox, span, date, del);
        list.appendChild(li);
    });

    let completed = tasks.filter(t => t.completed).length;
    let pending = tasks.length - completed;

    document.getElementById("completedCount").innerText = completed;
    document.getElementById("pendingCount").innerText = pending;
}

function addTask() {
    let input = document.getElementById("taskInput");
    let value = input.value.trim();

    if (value === "") {
        alert("Please enter your task!");
        return;
    }

    tasks.push({
        text: value,
        date: getDate(),
        completed: false
    });

    saveTasks();
    showTasks();
    input.value = "";
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    showTasks();
}

showTasks();