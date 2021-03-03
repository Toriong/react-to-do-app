import React, { useState, useEffect } from 'react'
import Task from './Task'


const Index = () => {
    const [toDoItem, setToDoItem] = useState('');
    const [dueDate, setDueDate] = useState('')
    const [userInputArray, setUserInputArray] = useState([])

    const addToDo = (reset) => {
        reset.preventDefault()
        let confirmedToDo = { id: new Date().getTime().toString(), task: toDoItem, completed: false, dueDate: dueDate };
        setUserInputArray(previousArray => [...previousArray, confirmedToDo]);
        setToDoItem(" ");
        setDueDate(" ");
    };
    const deleteMe = (item) => {
        let updatedArray = userInputArray.filter((deleteItem) => {
            return deleteItem.id !== item.id
        })
        setUserInputArray(updatedArray);
    }

    useEffect(() => {
        let getItems = JSON.parse(localStorage.getItem("User-Input-Array"));
        setUserInputArray(getItems);
    }, [])

    useEffect(() => {
        let save = JSON.stringify(userInputArray)
        localStorage.setItem("User-Input-Array", save)
    }, [userInputArray])

    const completedItem = (targetItem) => {
        let upDatedArray = userInputArray.map((item) => {
            if (item.id === targetItem.id) {
                return {
                    ...item,
                    completed: true
                }
            } else {
                return item;
            }
        })
        setUserInputArray(upDatedArray);
    }

    const confirmChange = (targetedTask, closeFunction) => {
        let updatedUserInputArray = userInputArray.map((item) => {
            if (item.id === targetedTask.id) {
                return {
                    ...item,
                    task: targetedTask.task,
                    dueDate: targetedTask.dueDate
                };
            } else {
                return item;
            }
        })
        setUserInputArray(updatedUserInputArray);
        closeFunction(false)

    }

    return (
        <>
            <div className="to-do-list-adder">
                <h5>Add Task</h5>
                <form onSubmit={addToDo}>
                    <input type="text" value={(toDoItem)} onChange={(typing) => { setToDoItem(typing.target.value) }} />
                    <h5>DUE ON: </h5>
                    <input type="date" value={(dueDate)} onChange={(typing) => { setDueDate(typing.target.value) }}></input>
                    <br />
                    <br />
                    <button onSubmit={addToDo}>ADD</button>
                </form>
            </div>
            <h1>My To-do List</h1>
            <div id="confirmed-to-do-list">
                <ul className="to-do-list">
                    {userInputArray.map((item) => {
                        if (item.completed === false) {
                            return (
                                <Task taskItem={item} deleteItem={() => deleteMe(item)} completedItem={() => completedItem(item)} confirmChange={confirmChange} />
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
                                <li>{item.task}<button onClick={() => deleteMe(item)}>DEL</button></li>
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
