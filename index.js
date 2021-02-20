import React, {useState, useReducer }from 'react'




// WHAT I WANT: create a input for the user to enter his to do item
// What I WANT: when the user starts typing into the input, have the function within the onchange prop be executed, and recieve the values from the value prop within the same element and store it in the useState value

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
        ;
    }
}
//WHAT I WANT: when the user presses the add button, have the item first be entered into the toDoArray and then have a function that will put that item onto the UI. 
// WHAT I WANT: form the array of objects, I want the value of the task property to be displayed onto the UI


const Index = () => {
//     const DomManipulation = (task) => {
//     return (
//         <>
//             <li>{task}<button>COMPLETED</button><button>DEL</button></li> 
//         </>
//     );
// }
    // functionality of the deleteItem fucntion
    // GOAL: when the user presses the completed button, have the item be deleted from the toDoArray and be brought to the compArray
    // 1. get the object from the toDoArray and the id
    // 2. put each into its respective variable  
    // 3. use the id to run a filter through the toDoArray to delete the specific item from the toDoArray
    // 4. spit the new array out set it equal to the toDoArray.
    //5. have the variable that stored the object that is set as completed be put into the completed Array. 
    const [toDoItem, setToDoItem] = useState('');
    const [currentToDoItems, dispatch] = useReducer(reducer, initialState);
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
    return (
        <>
        <div className="to-do-list-adder">
                <h5>Add Task</h5>
                <form onSubmit={AddToDo}>      
                    <input type="text" value={toDoItem} onChange={(typing) => { setToDoItem(typing.target.value) }} />
                <br/>
                <br/>
                <button type="submit" onSubmit={AddToDo} >ADD</button>
                </form>
            </div>

            <header>
                {/* {console.log(currentToDoItems.toDoTasks)} */}
                <div className="to-do-list-container">
                    <h1>My To-do List</h1>
                    <div className="user-confirmed-to-dos-container">
                        <ul id="confirmed-to-do-list">
                            {currentToDoItems.toDoTasks.map((task) => {
                                { console.log(currentToDoItems.toDoTasks) }
                                { console.log("user to dos:", task.Task) }
                                { console.log('toDoObject', task) }
                                return (
                                    <>
                                        <li
                                            id={task.id}
                                        >{task.Task}<button onClick={() => { CompletedItem(task) }}>COMPLETED</button><button onClick={() => { DeleteMe(task) }}>DEL</button>
                                        </li> 
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
    
    
        </ol>
        {console.log(currentToDoItems.completion)}
        {console.log(currentToDoItems.toDoTasks)}
        
    </div>
            </div>
        </>
    )
}

export default Index;
