import React from 'react'

const PutToDoTasksOntoDom = React.memo((props) => {
    return (

        props.array.map((task) => {
            return (
                <>{console.log("PutToDoTasksOntoDom is being rendered")}
                    <li>{task.Task} <button onClick={() => props.CompFn(task)}>COMPLETED</button><button onClick={() => props.DeleteFn(task)}>DEL</button></li>
                </>
            );
        })
    )
},(prevProp, nextProp) => {
        if (prevProp !== nextProp) {
            console.log("'prevProp' is not equal to 'nextProp'");
            console.log(prevProp);
            console.log(nextProp);
        return true;
        } else {
            console.log("false");
        return false;
    }
});







export default PutToDoTasksOntoDom;
