let tasks = [];
function addTask() {        
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');

    if (taskInput.value !== '' && deadlineInput.value !== '') {
        const newTask = {
            task: taskInput.value,
            deadline: new Date(deadlineInput.value),
            complete: false,
        };

        tasks.push(newTask);
        displayTasks();
        taskInput.value = '';
        deadlineInput.value = '';
    }

        // Check if the added task is near the due date
        checkDueDateNotification(newTask);
    }
    
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        if (task.complete) {
            taskItem.classList.add('complete');
        }

        taskItem.innerHTML = `
            <span>${task.task} - Deadline: ${task.deadline.toLocaleString()}</span>
            <button onclick="startCountdown(${index})">Start</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="toggleComplete(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
            
        `;

        taskList.appendChild(taskItem);
    });
}
//Function to start countdown
function startCountdown() {
    var deadlineInput = document.getElementById("deadlineInput").value;
    var deadline = new Date(deadlineInput).getTime();

    var countdownInterval = setInterval(function() {
        var now = new Date().getTime();
        var timeDifference = deadline - now;

        var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        var countdownDisplay = document.getElementById("countdown");
        countdownDisplay.innerHTML = "Deadline In: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (timeDifference < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerHTML = "Deadline reached!";
        }
    }, 1000);
}


function toggleComplete(index) {
    tasks[index].complete = !tasks[index].complete;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function editTask(index) {
    const newTaskName = prompt('Edit task:', tasks[index].task);
    if (newTaskName !== null) {
        tasks[index].task = newTaskName;
        displayTasks();
    }
}

function checkDueDateNotification(task) {
    const notificationTime = new Date(task.deadline);
    const currentTime = new Date();

    // Set a notification for 1 hour before the due date
    const notificationDuration = notificationTime.getTime() - currentTime.getTime() - 3600000;

    if (notificationDuration > 0) {
        setTimeout(() => {
            showTaskNotification(task);
        }, notificationDuration);
    }
}

function showTaskNotification(task) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(`Task Due Soon: ${task.task}`, {
            body: `The deadline for the task "${task.task}" is approaching.`,
        });
    }
}

// Request permission for notifications
Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        fetchTasks();
    } else {
        console.error('Notification permission denied');
    }
});

// Feature 1: Count the total number of tasks
function countTasks() {
        // Select the ul element with the class name "tasklist"
        const taskList = document.querySelector('ul.taskList');
        
        // Check if the tasklist ul element exists
        if (taskList) {
            // Get all the li elements (tasks) inside the tasklist ul
            const tasks = taskList.querySelectorAll('li');
            
            // Return the number of tasks found
            return tasks.length;
        } else {
            // If the tasklist ul element doesn't exist, return 0
            return 0;
        }
    }
    
    // Example usage:
    const numberOfTasks = countTasks();
    console.log("Number of tasks:", numberOfTasks);
    
    // ... (existing code)

// Feature 2: Display tasks that are due today
function displayTasksDueToday() {
    // ... (existing code)
}

// ... (other features)

// Feature 15: Add priority level to tasks
function addPriorityToTask(index) {
    // ... (existing code)
}

// Display tasks on initial load
displayTasks();
