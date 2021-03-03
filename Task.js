import React, { useState } from 'react'

const Task = ({ taskItem, deleteItem, completedItem, confirmChange }) => {
    const userItem = {
        task: taskItem.task,
        dueDate: taskItem.dueDate,
        id: taskItem.id
    }

    const [tasks, setTasks] = useState(userItem);
    const [editMe, setEditMe] = useState(false);
    const edits = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setTasks({ ...tasks, [name]: value })
        console.log(tasks)
    }

    const clickToEdit = () => {
        setEditMe(!editMe);
    }

    const cancel = () => {
        tasks.task = taskItem.task
        tasks.dueDate = taskItem.dueDate
        setEditMe(false);
    }

    return (
        <>
            {editMe ?
                <div id="blocker">
                    <div className="edit-item-modal">
                        <h3>EDIT YOUR TASK</h3>
                        <input id="userTask" type="text" defaultValue={tasks.task} name="task" onChange={edits} />
                        <input id="userDate" type="date" defaultValue={tasks.dueDate} name="dueDate" onChange={edits} />
                        <button type="button" id="confirm-button" onClick={() => confirmChange(tasks, setEditMe)}>CONFIRM CHANGES</button>
                        <button type="button" id="cancel-button" onClick={() => cancel()}>CANCEL</button>
                    </div>
                </div>
                :
                <li>
                    <span>
                        <div onClick={() => clickToEdit()}>{taskItem.task}</div>
                        <div onClick={() => clickToEdit()}>DUE ON: {taskItem.dueDate}</div>
                        <button onClick={() => completedItem(taskItem)}>COMPLETED</button><button onClick={() => deleteItem(taskItem)}>DEL</button>
                    </span>
                </li>
            }
        </>
    );
}


export default Task
