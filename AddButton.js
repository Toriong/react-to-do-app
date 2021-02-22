import React from 'react'

const AddButton = React.memo((props) => {
    return (
        <>
            <button type="submit" onSubmit={props.addFunction} >ADD</button>    
            {console.log("button was rendered")}
        </>
    )
}, (prevProp, nextProp) => {
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

export default AddButton