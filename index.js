import React, {useState, useReducer }from 'react'




// WHAT I WANT: create a input for the user to enter his to do item
// What I WANT: when the user starts typing into the input, have the function within the onchange prop be executed, and recieve the values from the value prop within the same element and store it in the useState value

const initialState = {
    toDoTasks: [],
    toDoNames: [],
}
const reducer = (previousToDoItems, action) => {
    console.log(action)
    if (action.type === "CONFIRMED_TO_DO") {
        const newTask = action.confirmedToDo;
        return {
            ...previousToDoItems,
            toDoTasks: [newTask],
            toDoNames: [action.confirmedToDo.Task]
        }
    }
}
//WHAT I WANT: when the user presses the add button, have the item first be entered into the toDoArray and then have a function that will put that item onto the UI. 



const Index = () => {
    const DomManipulation = (task) => {
    return (
        <>
            <li>{task}<button>COMPLETED</button><button>DEL</button></li> 
        </>
    );
}
    const [toDoItem, setToDoItem] = useState('');
    const [currentToDoItems, dispatch] = useReducer(reducer, initialState);
    const AddToDo = (e) => {
        e.preventDefault();
        console.log('hello')
        let confirmedToDo = { id: new Date().getTime().toString(), Task: toDoItem, completed: false };
        console.log(confirmedToDo)
        dispatch({ type: ("CONFIRMED_TO_DO"), confirmedToDo })
    }
    return (
        <>
        <div className="to-do-list-adder">
                <h5>Add Task</h5>
                <form onSubmit={AddToDo}>      
                <input type="text" value={toDoItem} onChange={(typing) => { setToDoItem(typing.target.value) }}/>
                <br/>
                <br/>
                <button type="submit" onSubmit={AddToDo} >ADD</button>
                </form>
            </div>

            <header>
                <div className="to-do-list-container">
                    <h1>My To-do List</h1>
                    <div className="user-confirmed-to-dos-container">
                        {console.log(currentToDoItems)}
                        {console.log(currentToDoItems.toDoArray)}
                        <ul id="confirmed-to-do-list">
                            {currentToDoItems.toDoNames.map((task) => {
                                {console.log(task)}
                                {/* WHAT I WANT: have each task undergo the DOM manipulation. make a function that will recieve the task, perform the DOM manipulation upon the task, and spit it out */ }
                                return (
                                    <>
                                    <li>{task}<button>COMPLETED</button><button>DEL</button></li> 
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
        
    
    
        </ol>
    
    </div>
    </div>
        </>
    )
}

export default Index;
