import React, { useState, useEffect } from 'react'
import Task from './Task'
import Modal from './Modal'
import ModalForClears from './ModalForClears'
import moment from 'moment'

const Index = () => {
    const todaysDate = moment().format("YYYY-MM-DD");
    const [toDoItem, setToDoItem] = useState('');
    const [getClearOptionValue, setGetClearOptionValue] = useState("make a selection")
    const [modalForClears, setModalForClears] = useState(false);
    const [dueDate, setDueDate] = useState(todaysDate);
    const [userInputArray, setUserInputArray] = useState([])
    const defaultModalState = { isOpen: false, content: " " }
    const [modalState, setModalState] = useState(defaultModalState)

    const addToDo = (reset) => {
        reset.preventDefault()
        console.log(typeof toDoItem)
        if (toDoItem === '' || toDoItem.trim().length === 0) {
            setModalState({ isOpen: true, content: "ENTER A TASK" })
            return;
        }
        if (dueDate.length > 10) {
            setModalState({ isOpen: true, content: "ENTER A VALID DATE" })
            return;
        }
        console.log(dueDate)
        console.log(typeof dueDate)
        let confirmedToDo = { id: new Date().getTime().toString(), task: toDoItem, completed: false, dueDate: dueDate };
        setUserInputArray(previousArray => [...previousArray, confirmedToDo]);
        // change modalState.isOpen to true
        setModalState({ isOpen: true, content: "Task ADDED" })
        setToDoItem('');
        setDueDate(todaysDate);
    };
    const deleteMe = (item) => {
        let updatedArray = userInputArray.filter((deleteItem) => {
            return deleteItem.id !== item.id
        })
        setUserInputArray(updatedArray);
        setModalState({ isOpen: true, content: "Item DELETED" })
    }

    const completedItem = (targetItem) => {
        let updatedArray = userInputArray.map((item) => {
            if (item.id === targetItem) {
                return {
                    ...item,
                    completed: true
                }
            } else {
                return item;
            }
        })

        setUserInputArray(updatedArray);
        setModalState({ isOpen: true, content: "Task COMPLETED" })
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
        setModalState({ isOpen: true, content: "Changes SAVED" })
    }

    const executeClear = () => {
        if (getClearOptionValue === "CLEAR TO-DOS") {
            const updatedArray = userInputArray.filter((item) => {
                return item.completed !== false;
            })
            setUserInputArray(updatedArray);
            setModalForClears(!modalForClears)
            setModalState({ isOpen: true, content: "To-do list cleared" })
        } else if (getClearOptionValue === "CLEAR COMPLETIONS") {
            const updatedArray = userInputArray.filter((item) => {
                return item.completed !== true;
            })
            setUserInputArray(updatedArray);
            setModalForClears(!modalForClears)
            setModalState({ isOpen: true, content: "Completions cleared" })
        } else if (getClearOptionValue === "CLEAR ALL") {
            setUserInputArray([]);
            setModalForClears(!modalForClears)
            setModalState({ isOpen: true, content: "ALL cleared" })
        }
    }

    useEffect(() => {
        let getItems = JSON.parse(localStorage.getItem("User-Input-Array"));
        console.log(getItems);
        setUserInputArray(getItems);
    }, [])

    useEffect(() => {
        let save = JSON.stringify(userInputArray)
        localStorage.setItem("User-Input-Array", save)
        console.log(userInputArray)
    }, [userInputArray])

    const undo = (undoItem) => {
        let updatedArray = userInputArray.map((item) => {
            if (item.id === undoItem.id) {
                return {
                    ...undoItem,
                    completed: false
                }
            } else {
                return item;
            }
        })
        setUserInputArray(updatedArray)
        setModalState({ isOpen: true, content: "UNDO" })
    }
    return (
        <>
            <div className="modal-container">
                {/* conditionally call the modal */}
                {modalState.isOpen && <Modal modalContent={modalState.content} setModal={setModalState} />}
            </div>
            <div className="to-do-list-adder">
                <h5>TASK:</h5>
                <form onSubmit={addToDo}>
                    <input type="text" value={(toDoItem)} onChange={(typing) => { setToDoItem(typing.target.value) }} />
                    <h5>DUE ON: </h5>
                    <input type="date" value={(dueDate)} onChange={(typing) => { setDueDate(typing.target.value) }}></input>
                    <br />
                    <br />
                    <button onSubmit={addToDo}>ADD</button>
                </form>
                <br />
                <h5>CLEAR ITEMS</h5>
                <select id="clear-container" onChange={(click) => setGetClearOptionValue(click.target.value)}>
                    <option id="clear-options" defaultValue={"make a selection"}>make a selection</option>
                    <option id="clear-to-dos" value={"CLEAR TO-DOS"}>CLEAR TO DOS</option>
                    <option id="clear-completions" value={"CLEAR COMPLETIONS"}>CLEAR COMPLETIONS</option>
                    <option id="clear-all" value={"CLEAR ALL"}>CLEAR ALL</option>
                </select>
                <br />
                {modalForClears && <ModalForClears cancelFunction={setModalForClears} clearFunction={executeClear} getClearOptionValue={getClearOptionValue} modalForClears={modalForClears} />}
                <br />
                <button id="clear-button" onClick={() => setModalForClears(!modalForClears)}>CLEAR</button>
            </div>
            <div id="confirmed-to-do-list">
                <h1>My To-do List</h1>
                <ul className="to-do-list">
                    {userInputArray.map((item) => {
                        if (item.completed === false) {
                            return (
                                <Task taskItem={item} deleteItem={() => deleteMe(item)} completedItem={() => completedItem(item.id)} confirmChange={confirmChange} showModalFunction={setModalState} object={{ isOpen: true, content: "NO CHANGES HAVE OCCURED" }} />
                            )
                        } else {
                            return null;
                        }
                    })}
                </ul>
            </div>
            <div class="completion-container">
                <h1>Your Completions. Great Job!</h1>
                <ul id="user-completion-list">
                    {userInputArray.map((item) => {
                        if (item.completed === true) {
                            return (
                                <div className="list-item-container-for-completions">
                                    <div className="completions">
                                        <p>
                                            {item.task}
                                        </p>
                                    </div>
                                    <div className="button-container">
                                        <div className="buttons">
                                            <button onClick={() => undo(item)}>UNDO</button>
                                            <button onClick={() => deleteMe(item)}>DEL</button>
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
