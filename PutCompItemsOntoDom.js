import React from 'react'

const PutCompItemsOntoDom = (props) => {
    return (

        props.array.map((task) => {
            return (
                <>{console.log("I am being rendered, PutCompItemsOntoDom")}
                    <li>{task.Task}<button onClick={() => props.DeleteFn(task)}>DEL</button></li>
                </>
            );
        })
    )
}
    
    

//     (prevProp, nextProp) => {
//     if (prevProp !== nextProp) {
//         console.log("'prevProp' is not equal to 'nextProp'");
//         console.log(prevProp);
//         console.log(nextProp);
//     return true;
//     } else {
//         console.log("false");
//     return false;
// }
// });
    
    
    
    
    


export default PutCompItemsOntoDom
