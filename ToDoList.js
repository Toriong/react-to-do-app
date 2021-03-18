import React, { useState, useEffect } from 'react'
import Task from './Task'
import Modal from './Modal'
import ModalForClears from './ModalForClears'
import moment from 'moment'

const updateDefaultDate = (setDueDate) => {
    var currentTime = new Date(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes(),
        seconds = currentTime.getSeconds(),
        text = (hours + ':' + minutes + ':' + seconds);
    console.log(text);
    if (text === "0:0:0") {
        setDueDate(moment().format("YYYY-MM-DD"))
    } else {
        console.log("present day")
    }
}



const Index = () => {
    const todaysDate = moment().format("YYYY-MM-DD")
    const [toDoItem, setToDoItem] = useState('');
    const [getClearOptionValue, setGetClearOptionValue] = useState("make a selection")
    const [isModalForClearsOpen, setIsModalForClearsOpen] = useState(false);
    const [dueDate, setDueDate] = useState(todaysDate);
    const [userToDoList, setUserToDoList] = useState([])
    const [modalOpen, setModalOpen] = useState({ isOpen: false, content: " " })

    useEffect(() => {
        setInterval(() => { updateDefaultDate(setDueDate) }, 1000)
    }, [dueDate])
    const addToDo = (event) => {
        event.preventDefault()
        if (toDoItem === '' || toDoItem.trim().length === 0) {
            setModalOpen({ isOpen: true, content: "ENTER A TASK" })
            return;
        }
        if (dueDate.length > 10) {
            setModalOpen({ isOpen: true, content: "ENTER A VALID DATE" })
            return;
        }
        let confirmedToDo = { id: Math.random().toString(16).slice(2).toString(), task: toDoItem, completed: false, dueDate: dueDate };
        setUserToDoList(previousArray => [...previousArray, confirmedToDo]);
        setModalOpen({ isOpen: true, content: "Task ADDED" })
        setToDoItem('');
        setDueDate(todaysDate);
    };

    const updateList = (newArray, modalObject) => {
        setUserToDoList(newArray);
        setModalOpen(modalObject);
    }
    const confirmChange = (targetedTask, closeFunction) => {
        if (targetedTask.task === '' || targetedTask.task.trim().length === 0) {
            alert("Enter a task")
            return;
        }
        if (targetedTask.dueDate.length > 10) {
            alert("Enter a valid date")
            return;
        }
        setUserToDoList(userToDoList.map((item) => {
            if (item.id === targetedTask.id) {
                return {
                    ...item,
                    task: targetedTask.task,
                    dueDate: targetedTask.dueDate
                };
            } else {
                return item;
            }
        }));
        closeFunction(false)
        setModalOpen({ isOpen: true, content: "Changes SAVED" })
    }
    const clearSelectedItems = (updatedArray, modalContent) => {
        setUserToDoList(updatedArray);
        setIsModalForClearsOpen(!isModalForClearsOpen);
        setModalOpen(modalContent)
    }

    // closure 
    // previus name 'executeClear'
    const clearAll = () => {
        if (getClearOptionValue === "to-dos") {
            // originally, updatedArray
            clearSelectedItems(userToDoList.filter((item) => item.completed), { isOpen: true, content: "To-do list cleared" })
        }
        else if (getClearOptionValue === "completions") {
            // originally, updatedArray
            clearSelectedItems(userToDoList.filter((item) => !item.completed), { isOpen: true, content: "Completions list cleared" })
        }
        else if (getClearOptionValue === "all") {
            clearSelectedItems([], { isOpen: true, content: "To-do list cleared" })
        }
    }
    useEffect(() => {
        setUserToDoList(JSON.parse(localStorage.getItem("User-Input-Array")));
    }, [])
    useEffect(() => {
        localStorage.setItem("User-Input-Array", JSON.stringify(userToDoList))
    }, [userToDoList])
    return (
        <>
            <div className="modal-container">
                {modalOpen.isOpen && <Modal modal={modalOpen} setModal={setModalOpen} />}
            </div>
            <div className="to-do-list-adder">
                <h5>TASK:</h5>
                <form onSubmit={addToDo}>
                    <input id="to-do-input" type="text" value={(toDoItem)} onChange={(event) => { setToDoItem(event.target.value) }} />
                    <h5>DUE ON: </h5>
                    <input id="date-input" type="date" value={dueDate} onChange={(event) => { setDueDate(event.target.value) }}></input>
                    <button id="add-button" onSubmit={addToDo}>ADD</button>
                </form>
                <h5 id="clear-items-title">CLEAR ITEMS</h5>
                <select id="clear-menu" onChange={(event) => { setGetClearOptionValue(event.target.value) }}>
                    <option value="please make a selection" >make a selection</option>
                    <option value="to-dos"  >CLEAR TO-DOS</option>
                    <option value="completions" >CLEAR COMPLETIONS</option>
                    <option value="all"  >CLEAR ALL</option>
                </select>
                {isModalForClearsOpen && <ModalForClears cancelFunction={() => { setIsModalForClearsOpen(!isModalForClearsOpen) }} clearFunction={clearAll} value={getClearOptionValue} />}
                <button id="clear-button" onClick={() => { setIsModalForClearsOpen(!isModalForClearsOpen) }}>CLEAR</button>
            </div>
            <div id="confirmed-to-do-list">
                <h1>My To-do List</h1>
                <ul className="to-do-list">
                    {userToDoList.map((toDoTask) => {
                        if (toDoTask.completed === false) {
                            return (
                                <Task taskItem={toDoTask} deleteItem={() => {
                                    updateList(userToDoList.filter((deleteItem) => {
                                        return deleteItem.id !== toDoTask.id
                                    }), { isOpen: true, content: "Item DELETED" })
                                }} completedItem={() => {
                                    updateList(userToDoList.map((item) => {
                                        if (item.id === toDoTask.id) { return { ...item, completed: true } } else { return item; }
                                    }), { isOpen: true, content: "Task COMPLETED" }
                                    )
                                }} confirmChange={confirmChange} showModalFunction={setModalOpen} object={{ isOpen: true, content: "NO CHANGES HAVE OCCURED" }} />)
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </div>
            <div class="completion-container">
                <h1>Your Completions. Great Job!</h1>
                <ul id="user-completion-list">
                    {userToDoList.map((completedItem) => {
                        if (completedItem.completed === true) {
                            return (
                                <div className="list-item-container-for-completions">
                                    <div className="completions">
                                        <p>
                                            {completedItem.task}
                                        </p>
                                    </div>
                                    <div className="button-container">
                                        <div className="buttons">
                                            <button onClick={() => {
                                                updateList(userToDoList.map((item) => {
                                                    if (item.id === completedItem.id) {
                                                        return {
                                                            ...item,
                                                            completed: false
                                                        }
                                                    } else {
                                                        return item;
                                                    }
                                                }), { isOpen: true, content: "UNDO" })
                                            }}>UNDO</button>
                                            <button onClick={() => {
                                                updateList(userToDoList.filter((deleteItem) => {
                                                    return deleteItem.id !== completedItem.id
                                                }), { isOpen: true, content: "Item DELETED" })
                                            }}>DEL</button>
                                        </div>
                                    </div>
                                </div>
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
