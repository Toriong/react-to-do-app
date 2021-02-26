import React, { useState, useEffect } from 'react'

const Index = () => {
    const [toDoItem, setToDoItem] = useState('');
    const [dueDate, setDueDate] = useState('')
    const [userInputArray, setUserInputArray] = useState([])

    const AddToDo = (reset) => {
        reset.preventDefault()
        let confirmedToDo = { id: new Date().getTime().toString(), task: toDoItem, completed: false, dueDate: dueDate };
        setUserInputArray(previousArray => [...previousArray, confirmedToDo]);
        setToDoItem(" ");
        setDueDate(" ");
    };

    const DeleteMe = (item) => {
        let updatedArray = userInputArray.filter((deleteItem) => {
            return deleteItem.id !== item.id
        })
        setUserInputArray(updatedArray);
    }

    const Task = ({ taskItem }) => {
        const userItem = {
            task: taskItem.task,
            dueDate: taskItem.dueDate
        }

        const completedItem = () => {
            let upDatedArray = userInputArray.map((item) => {
                if (item.id === taskItem.id) {
                    return {
                        ...item,
                        completed: true
                    }
                } else {
                    return item;
                }
            })
            setUserInputArray(upDatedArray)
        }

        const [tasks, setTasks] = useState(userItem);
        const [editMe, setEditMe] = useState(false);

        const edits = (event) => {
            let value = event.target.value;
            let name = event.target.name;
            setTasks({ ...tasks, [name]: value })
        }

        const clickToEdit = () => {
            setEditMe(!editMe);
        }

        const getObject = () => {
            for (let i = 0; i <= userInputArray.length; i++) {
                if (userInputArray[i].id === taskItem.id) {
                    return userInputArray[i];
                }
            }
        }
        const confirmChange = () => {
            let targetObject = getObject();
            targetObject.task = tasks.task
            targetObject.dueDate = tasks.dueDate
            let index = userInputArray.indexOf(taskItem)
            userInputArray[index] = targetObject
            localStorage.setItem("User-Input-Array", JSON.stringify(userInputArray))
            setEditMe(false)
        }

        const cancel = () => {
            tasks.task = taskItem.task
            tasks.dueDate = taskItem.dueDate
            setEditMe(false);
        }

        return (
            <>
                {editMe ?
                    <div className="edit-item-modal">
                        <input id="userTask" type="text" defaultValue={tasks.task} name="task" onChange={edits} />
                        <input id="userDate" type="date" defaultValue={tasks.dueDate} name="dueDate" onChange={edits} />
                        <button type="button" onClick={() => confirmChange()}>CONFIRM CHANGES</button>
                        <button type="button" onClick={() => cancel()}>CANCEL</button>
                    </div>
                    :
                    <li>
                        <span>
                            <div onClick={() => clickToEdit()}>{taskItem.task}</div>
                            <div onClick={() => clickToEdit()}>DUE ON: {taskItem.dueDate}</div>
                            <button onClick={completedItem}>COMPLETED</button><button onClick={() => DeleteMe(taskItem)}>DEL</button>
                        </span>
                    </li>
                }
            </>
        );
    }

    useEffect(() => {
        let getItems = JSON.parse(localStorage.getItem("User-Input-Array"));
        setUserInputArray(getItems);
    }, [])

    useEffect(() => {
        let save = JSON.stringify(userInputArray)
        localStorage.setItem("User-Input-Array", save)
    }, [userInputArray])


    return (
        <>
            <div className="to-do-list-adder">
                <h5>Add Task</h5>
                <form onSubmit={AddToDo}>
                    <input type="text" value={(toDoItem)} onChange={(typing) => { setToDoItem(typing.target.value) }} />
                    <h5>DUE ON: </h5>
                    <input type="date" value={(dueDate)} onChange={(typing) => { setDueDate(typing.target.value) }}></input>
                    <br />
                    <br />
                    <button onSubmit={AddToDo}>ADD</button>
                </form>
            </div>
            <h1>My To-do List</h1>
            <div id="confirmed-to-do-list">
                <ul className="to-do-list">
                    {userInputArray.map((item) => {
                        if (item.completed === false) {
                            return (
                                <Task taskItem={item} />
                            )
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </div>
            <div class="user-confirmed-to-dos-container">
            </div>
            <div class="completion-containter">
                <h1>Your Completions. Great Job!</h1>
                <ul id="user-completion-list">
                    {userInputArray.map((item) => {
                        if (item.completed === true) {
                            return (
                                <li>{item.task}<button onClick={() => DeleteMe(item)}>DEL</button></li>
                            )
                        } else {
                            return null;
                        }
                    })}
                </ul>

            </div>
        </>
    )
}

export default Index;
