import React, { useState, useReducer, useEffect, useCallback, memo } from 'react'
import AddButton from './AddButton'
import PutToDoTasksOntoDom from './PutToDoTasksOntoDom'
import PutCompItemsOntoDom from './PutCompItemsOntoDom'





const initialState = {
    toDoTasks: [],
    completion: [],
}



const reducer = (previousToDoItems, action) => {
    if (action.type === "CONFIRMED_TO_DO") {
        console.log('CONFIRMED')
        const newTask = action.confirmedToDo;
        return {
            ...previousToDoItems,
            toDoTasks: [...previousToDoItems.toDoTasks, newTask],
        }
    } else if (action.type === "COMPLETED") {
        console.log('COMPLETED')
        console.log(action.payload)
        let completedItem = action.payload
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
        console.log('DELETE')
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
        console.log("SAVED")
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
    console.log(completionGet);
    if (toDoTasksGet !== null && completionGet.length !== null) {
        return {
            toDoTasks: JSON.parse(toDoTasksGet),
            completion: JSON.parse(completionGet)
        }
    } else if (toDoTasksGet == null && completionGet == null) {
        return {
            toDoTasks: [],
            completion: []
        }
    } else if (toDoTasksGet !== null && completionGet == null) {
        return {
            toDoTasks: JSON.parse(toDoTasksGet),
            completion: []
        }
    } else if (toDoTasksGet == null && completionGet !== null) {
        return {
            toDoTasks: [],
            completion: JSON.parse(toDoTasksGet)
        }

    }

}
const Index = () => {
    const [toDoItem, setToDoItem] = useState('');
    // currentToDoItems will always begin as an empty array by default
    const [currentToDoItems, dispatch] = useReducer(reducer, initialState, getUserDataFromLocalStorage);
    const AddToDo = useCallback((reset) => {
        reset.preventDefault()
        console.log("I was executed")
        console.log("task", toDoItem)
        let confirmedToDo = { id: new Date().getTime().toString(), Task: toDoItem, completed: false };
        console.log(confirmedToDo.Task)
        setToDoItem(" ")
        dispatch({ type: ("CONFIRMED_TO_DO"), confirmedToDo });
        // ASK Ilya about this:
    },[toDoItem, currentToDoItems.toDoTasks]);
    
    // const CompletedItem = useCallback(( task) => {
    //     console.log("Completed Button was pressed")
    //         dispatch({type:"COMPLETED", payload: task})    
    // },[toDoItem, currentToDoItems])
     const CompletedItem = (task) => {
        console.log("Completed Button was pressed")
            dispatch({type:"COMPLETED", payload: task})    
     }
    const DeleteMe = (task) => {
        console.log("DelteButton was pressed")
        dispatch({ type: "DELETE", payload: task })
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
                    <input type="text" value={(toDoItem)} onChange={(typing) => { setToDoItem(typing.target.value) }} />
                <br/>
                <br/>
                    <AddButton onSubmit={AddToDo}/>
                </form>
        </div>

            <header>
                <div className="to-do-list-container">
                    <h1>My To-do List</h1>
                    <div className="user-confirmed-to-dos-container">
                        <ul id="confirmed-to-do-list">
                            {console.log(currentToDoItems.toDoTasks)}
                            <PutToDoTasksOntoDom array={currentToDoItems.toDoTasks} CompFn={CompletedItem} DeleteFn={DeleteMe}/>

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
            <PutCompItemsOntoDom array={currentToDoItems.completion} DeleteFn={DeleteMe}/>
        </ol>
        
    </div>
            </div>
        </>
    )
}

export default Index;
