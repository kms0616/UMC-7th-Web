document.getElementById('taskInput').addEventListener('keypress', function (e) { //taskinput에서 키보드를 누른다면
    if (e.key === 'Enter') { //키보드가 엔터를 눌렀을 때
        const task = e.target.value; 
        if (task) { // 값이 존재하면 addtask하고 입력창 비움
            addTask(task);
            e.target.value = '';
        }
    }
});

function addTask(task) { //addtask의 기능
    const todoList = document.getElementById('todoList'); //todolist li라는 요소 생성하고 li에 추가함
    const li = document.createElement('li');
    li.textContent = task;

    const completeButton = document.createElement('button'); //button생성
    completeButton.textContent = '완료'; 
    completeButton.addEventListener('click', function () {
        moveToDone(task); //완료 버튼 누르면 완료한 일에 추가함
    });

    li.appendChild(completeButton); //li항목에 버튼 추가
    todoList.appendChild(li); //todolist에 추가해서 화면에 나타나게 함
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

    const todoItems = document.querySelectorAll('#todoList li'); //할 일에서 해낸일에 들어가면 할 일 목록에서는 삭제함
    todoItems.forEach(item => {
        if (item.textContent.includes(task)) {
            item.remove(); // task 내용에 따라 맞는 item 삭제
        }
    });
}
