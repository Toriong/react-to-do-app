import React from 'react'

const AddButton= React.memo((addFunction) =>{
    return (
        <>
       
        {console.log("add button added")}
        <button type="submit" onSubmit={addFunction} >ADD</button>
                
        
        </>
    )
})

export default AddButton