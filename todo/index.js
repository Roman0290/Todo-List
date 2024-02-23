document.querySelector('#push').onclick = function () {
    if (document.querySelector('#newtask input').value.length == 0) {
        alert("Please Enter Task");
    } else {
        const taskName = document.querySelector('#newtask input').value;

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: taskName,
                completed: false
            }),
        })
            .then(response => response.json())
            .then(data => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');

                const checkboxAndTask = document.createElement('div');

                const taskCheckbox = document.createElement('input');
                taskCheckbox.setAttribute('type', 'checkbox');
                taskCheckbox.addEventListener('change', function () {
                    if (this.checked) {
                        taskSpan.classList.add('completed');
                        taskDiv.classList.add('removed');
                    } else {
                        taskSpan.classList.remove('completed');
                        taskDiv.classList.remove('removed');
                    }
                });

                const taskSpan = document.createElement('span');
                taskSpan.textContent = data.title;

                checkboxAndTask.appendChild(taskCheckbox);
                checkboxAndTask.appendChild(taskSpan);

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete');
                deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
                deleteButton.addEventListener('click', function () {
                    taskDiv.remove();
                });

                taskDiv.appendChild(checkboxAndTask);
                taskDiv.appendChild(deleteButton);

                document.querySelector('#tasks').appendChild(taskDiv);

                // Clear the input field after adding the task
                document.querySelector('#newtask input').value = '';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
};