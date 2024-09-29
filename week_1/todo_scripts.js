document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const task = e.target.value;
        if (task) {
            addTask(task);
            e.target.value = '';
        }
    }
});

function addTask(task) {
    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = task;

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.addEventListener('click', function () {
        moveToDone(task);
    });

    li.appendChild(completeButton);
    todoList.appendChild(li);
}

function moveToDone(task) {
    const doneList = document.getElementById('doneList');
    const li = document.createElement('li');
    li.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function () {
        li.remove();
    });

    li.appendChild(deleteButton);
    li.classList.add('done');
    doneList.appendChild(li);

    const todoItems = document.querySelectorAll('#todoList li');
    todoItems.forEach(item => {
        if (item.textContent.includes(task)) {
            item.remove(); // task 내용에 따라 맞는 item 삭제
        }
    });
}
