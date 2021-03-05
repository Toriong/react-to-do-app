import React, { useState } from 'react'

const Task = ({ taskItem, deleteItem, completedItem, confirmChange }) => {
    const userItem = {
        task: taskItem.task,
        dueDate: taskItem.dueDate,
        id: taskItem.id
    }

    const [editTask, setEditTask] = useState(userItem);
    const [editMe, setEditMe] = useState(false);
    const edits = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setEditTask({ ...editTask, [name]: value })
        console.log(editTask)
    }

    const clickToEdit = () => {
        setEditMe(!editMe);
    }

    const cancel = () => {
        editTask.task = taskItem.task
        editTask.dueDate = taskItem.dueDate
        setEditMe(false);
    }

    return (
        <>
            {editMe ?
                <div id="blocker">
                    <div className="edit-item-modal">
                        <h3>EDIT YOUR TASK</h3>
                        <input id="userTask" type="text" defaultValue={editTask.task} name="task" onChange={edits} />
                        <input id="userDate" type="date" defaultValue={editTask.dueDate} name="dueDate" onChange={edits} />
                        <button type="button" id="confirm-button" onClick={() => confirmChange(editTask, setEditMe)}>CONFIRM CHANGES</button>
                        <button type="button" id="cancel-button" onClick={() => cancel()}>CANCEL</button>
                    </div>
                </div>
                :

                <div className="list-item-container">

                    <div className="due-date">
                        <div onClick={() => clickToEdit()}>{taskItem.task}</div>
                    </div>
                    <div className="button-container">
                        <div className="due-date" onClick={() => clickToEdit()}>DUE ON: {taskItem.dueDate}</div>
                        <div className="buttons">
                            <button onClick={() => completedItem(taskItem)}>COMPLETED</button><button onClick={() => deleteItem(taskItem)}>DEL</button>
                        </div>
                    </div>


                </div>

            }
        </>
    );
}


export default Task
