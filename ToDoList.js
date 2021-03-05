import React, { useState, useEffect } from 'react'
import Task from './Task'
import Modal from './Modal'

const Index = () => {
    const [toDoItem, setToDoItem] = useState('');
    const [dueDate, setDueDate] = useState('')
    const [userInputArray, setUserInputArray] = useState([])
    const defaultModalState = {
        isOpen: false,
        modalContent: " "
    }
    const [modalState, setModalState] = useState(defaultModalState)

    const addToDo = (reset) => {
        reset.preventDefault()
        let confirmedToDo = { id: new Date().getTime().toString(), task: toDoItem, completed: false, dueDate: dueDate };
        setUserInputArray(previousArray => [...previousArray, confirmedToDo]);
        setModalState({
            isOpen: true,
            modalContent: "Task ADDED"
        })
        setToDoItem(" ");
        setDueDate(" ");
    };
    const deleteMe = (item) => {
        let updatedArray = userInputArray.filter((deleteItem) => {
            return deleteItem.id !== item.id
        })
        setUserInputArray(updatedArray);
        setModalState({
            isOpen: true,
            modalContent: "Item DELETED"
        })
    }

    const completedItem = (targetItem) => {
        let updatedArray = userInputArray.map((item) => {
            if (item.id === targetItem.id) {
                return {
                    ...item,
                    completed: true
                }
            } else {
                return item;
            }
        })
        setUserInputArray(updatedArray);
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

    useEffect(() => {
        let getItems = JSON.parse(localStorage.getItem("User-Input-Array"));
        setUserInputArray(getItems);
    }, [])

    const executeClear = () => {
        if (getClearOptionValue === "CLEAR TO-DOS") {
            const updatedArray = userInputArray.filter((item) => {
                return item.completed !== false;
            })
            setUserInputArray(updatedArray);
        } else if (getClearOptionValue === "CLEAR COMPLETIONS") {
            const updatedArray = userInputArray.filter((item) => {
                return item.completed !== true;
            })
            setUserInputArray(updatedArray);
        } else if (getClearOptionValue === "CLEAR ALL") {
            setUserInputArray([]);
        }
    }
    const [getClearOptionValue, setGetClearOptionValue] = useState('')

    useEffect(() => {
        let save = JSON.stringify(userInputArray)
        localStorage.setItem("User-Input-Array", save)
    }, [userInputArray])


    return (
        <>
            <div className="modal-container">
                {modalState.isOpen && <Modal setModal={setModalState} modalState={modalState} />}
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
                    <option id="clear-options" value={"make a selection"}>make a selection</option>
                    <option id="clear-to-dos" value={"CLEAR TO-DOS"}>CLEAR TO DOS</option>
                    <option id="clear-completions" value={"CLEAR COMPLETIONS"}>CLEAR COMPLETIONS</option>
                    <option id="clear-all" value={"CLEAR ALL"}>CLEAR ALL</option>
                </select>
                <br />
                <br />
                <button id="clear-button" onClick={executeClear}>CONFIRM CLEAR</button>
            </div>
            <div id="confirmed-to-do-list">
                <h1>My To-do List</h1>
                <ul className="to-do-list">
                    {userInputArray.map((item) => {
                        if (item.completed === false) {
                            return (
                                <>
                                    <Task taskItem={item} deleteItem={() => deleteMe(item)} completedItem={() => completedItem(item)} confirmChange={confirmChange} />
                                </>
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
                                    <div className="due-date">
                                        <div>{item.task}</div>
                                    </div>
                                    <div className="button-containe">
                                        <div className="buttons">
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
