import React, { useState, useEffect} from 'react'

const Index = () => {
    const [toDoItem, setToDoItem] = useState('');
    const [toDoItemsArray, setToDoItemsArray] = useState([])
    const [dueDate, setDueDate] = useState('')
    const [completionArray, setCompletionArray] = useState([]);
    const AddToDo = (reset) => {
        reset.preventDefault()
        let confirmedToDo = { id: new Date().getTime().toString(), task: toDoItem, completed: false, dueDate: dueDate};
        setToDoItemsArray(previousArray => [...previousArray, confirmedToDo]);
        setToDoItem(" ");
        setDueDate(" ");
    };
    const toDoTaskMarkedAsCompleted = (item) => {
        let completedItem;
        if (item.completed === false) {
            completedItem = { id: item.id, task: item.task, dueDate: item.dueDate, completed: true }
        }
        return completedItem;
    }
    const ItemCompleted = (completion) => {
        let completedItem = toDoTaskMarkedAsCompleted(completion)
        let upDatedToDoTasks = toDoItemsArray.filter((toDo) => {
            return toDo.id !== completion.id
        })
        setToDoItemsArray(upDatedToDoTasks);
        setCompletionArray(previousCompletions => [...previousCompletions, completedItem])
    }
    const DeleteMe = (item, array, fn) => {
        let updatedArray = array.filter((deleteItem)=>{
            return deleteItem.id !== item.id
        })
        fn(updatedArray);
    }
    
    useEffect(() => {
        const getToDoTasks = JSON.parse(localStorage.getItem("Saved-To-Do-Tasks"));
        const getCompletions = JSON.parse(localStorage.getItem("Saved-Completions"));
        setToDoItemsArray(getToDoTasks);
        setCompletionArray(getCompletions);

    },[])

    useEffect(() => {
        const toDoTasks = JSON.stringify(toDoItemsArray)
        const completions = JSON.stringify(completionArray)
        localStorage.setItem("Saved-To-Do-Tasks", toDoTasks);
        localStorage.setItem("Saved-Completions", completions);
    })

    return (
        <>
        <div className="to-do-list-adder">
                <h5>Add Task</h5>
                <form onSubmit={AddToDo}>      
                    <input type="text" value={(toDoItem)} onChange={(typing) => { setToDoItem(typing.target.value) }} />
                    <br />
                    <br/>
                    <button onSubmit={AddToDo}>ADD</button>
                </form>
        </div>

            <header>
                <div className="to-do-list-container">
                    <h1>My To-do List</h1>
                    <div className="user-confirmed-to-dos-container">
                        <ul id="confirmed-to-do-list">
                            {console.log("line 112", toDoItemsArray)}
                            {toDoItemsArray.map((item) => {
                                return (
                                        <li>{item.task} <button onClick={() => ItemCompleted(item)}>✅</button> <button onClick={()=>DeleteMe(item, toDoItemsArray, setToDoItemsArray)}>🗑️</button> DUE ON: <input type="date" value={(dueDate)} onChange={(typing) => { setDueDate(typing.target.value) }}></input></li>  
                                );
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
            {completionArray.map((item) => {
                return (
                    <li>{item.task}<button onClick={() => DeleteMe(item, completionArray, setCompletionArray)}>🗑️</button></li>  
                );   
            })}
        </ol>
        
    </div>
            </div>
            {console.log(toDoItemsArray)}
        </>
    )}
export default Index;
