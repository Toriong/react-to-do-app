import React, { useState, useReducer, useEffect, useCallback } from 'react'
import AddButton from './AddButton'
import CompletedButton from './CompletedButton'
import DeleteButton from './DeleteButton'





const initialState = {
    toDoTasks: [],
    completion: []
}



const reducer = (previousToDoItems, action) => {
    if (action.type === "CONFIRMED_TO_DO") {
        const newTask = action.confirmedToDo;
        return {
            ...previousToDoItems,
            toDoTasks: [...previousToDoItems.toDoTasks, newTask],
        }
    } else if (action.type === "COMPLETED") {
        console.log(action.payload)
        let completedItem = action.payload
        console.log("ID: ",action.payload.id)
        var upDatedToDoTasks = previousToDoItems.toDoTasks.filter((item) => {
            console.log("hello",item.id);
            return item.id !== action.payload.id
        })
        console.log(upDatedToDoTasks);
        return {
            ...previousToDoItems,
            toDoTasks: upDatedToDoTasks,
            completion: [...previousToDoItems.completion, completedItem]
        }
    } else if (action.type === "DELETE") {
        let toDoTasksCheck = previousToDoItems.toDoTasks.includes(action.payload);
        let completionCheck = previousToDoItems.completion.includes(action.payload);
        console.log("to-do check",toDoTasksCheck);
        console.log("completion check",completionCheck);
        if(toDoTasksCheck === true)
        {
            var upDatedToDoTasks = previousToDoItems.toDoTasks.filter((tasks) => {
            return tasks.id !== action.payload.id;
        })
            return {
                ...previousToDoItems,
                toDoTasks: upDatedToDoTasks,
            
        } 
            } else if (completionCheck === true) {
            let updatedCompletion = previousToDoItems.completion.filter((item) => {
                    return item.id !== action.payload.id
                })
                return {
                    ...previousToDoItems,
                    completion: updatedCompletion
                }
        }
    } else if (action.type === "SAVED") {
        const toDoTasks = JSON.stringify(action.payload.toDoTasks)
        const completions = JSON.stringify(action.payload.completion)
        localStorage.setItem("Saved-To-Do-Tasks", toDoTasks);
        localStorage.setItem("Saved-Completions", completions);
        return {
            ...previousToDoItems
        }
    }
}
//WHAT I WANT: when the user presses the add button, have the item first be entered into the toDoArray and then have a function that will put that item onto the UI. 
// WHAT I WANT: form the array of objects, I want the value of the task property to be displayed onto the UI
const getUserDataFromLocalStorage = () => {
    const toDoTasksGet = localStorage.getItem("Saved-To-Do-Tasks");
    const completionGet = localStorage.getItem("Saved-Completions");
    return {
        toDoTasks: JSON.parse(toDoTasksGet),
        completion: JSON.parse(completionGet)
    }
}


const Index = () => {
    const [toDoItem, setToDoItem] = useState('');
    // currentToDoItems will always begin as an empty array by default
    const [currentToDoItems, dispatch] = useReducer(reducer, initialState, getUserDataFromLocalStorage);
    const AddToDo = (reset) => {
        reset.preventDefault();
        let confirmedToDo = { id: new Date().getTime().toString(), Task: toDoItem, completed: false };
        setToDoItem(" ")
        dispatch({ type: ("CONFIRMED_TO_DO"), confirmedToDo });
    }
    
    const CompletedItem = (task) => {
            dispatch(({type:"COMPLETED", payload: task}))    
    }
    const DeleteMe = (task) => {
        dispatch({type: "DELETE", payload: task})
    }
    useEffect(()=> {
        dispatch({ type: "SAVED", payload: currentToDoItems })
        console.log("currentToDoItems", currentToDoItems);
    }, [currentToDoItems.toDoTasks, currentToDoItems.completion])

    return (
        <>
        <div className="to-do-list-adder">
                <h5>Add Task</h5>
                <form onSubmit={AddToDo}>      
                    <input type="text" value={toDoItem} onChange={(typing) => { setToDoItem(typing.target.value) }} />
                <br/>
                <br/>
                    {/* <button type="submit" onSubmit={AddToDo} >ADD</button> */}
                    <AddButton onSubmit={AddToDo }/>
                </form>
            </div>

            <header>
                {/* {console.log(currentToDoItems.toDoTasks)} */}
                <div className="to-do-list-container">
                    <h1>My To-do List</h1>
                    <div className="user-confirmed-to-dos-container">
                        <ul id="confirmed-to-do-list">
                            {console.log(currentToDoItems.toDoTasks)}
                            {currentToDoItems.toDoTasks.map((task) => {
                                return (
                                    <>
                                        {/* <li
                                            id={task.id}
                                        >{task.Task}<button onClick={() => { CompletedItem(task) }}>COMPLETED</button><button onClick={() => { DeleteMe(task) }}>DEL</button>
                                        </li>  */}
                                        <li>{task.Task}<button onClick={() => { CompletedItem(task) }}>COMPLETED</button><button onClick={() => { DeleteMe(task) }}>DEL</button></li> 
                                        
                                        {/* <li><CompletedButton onClick={CompletedItem(task)} /><DeleteButton onClick={DeleteMe(task)}/></li>
                                  {console.log("I am to dos are being rendered")}   */}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </header>
    
    <div class="to-do-list-container">
    <div class="user-confirmed-to-dos-container">
        <ul id="confirmed-to-do-list">
        </ul>
    </div>
    <div class="completion-containter">
        <h1>Your Completions. Great Job!</h1>
        <ol id="user-completion-list">
            {currentToDoItems.completion.map((completedItem) => {
                return (
                    
                    <li>{completedItem.Task} <button onClick={() => { DeleteMe(completedItem) }}>DEL</button> </li>  
                );
        })}
        {console.log("completions are being rendered")}
        </ol>
        
    </div>
            </div>
        </>
    )
}

export default Index;
