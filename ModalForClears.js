import React from 'react'


const ModalForClears = ({ cancelFunction, clearFunction, getClearOptionValue, modalForClears }) => {
    if ((getClearOptionValue === "CLEAR TO-DOS") || (getClearOptionValue === "CLEAR COMPLETIONS") || (getClearOptionValue === "CLEAR ALL")) {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction(!modalForClears)} />
                <div className="edit-item-modal">
                    <h3>You have selected "{getClearOptionValue}."</h3>
                    <h3 >Are sure you want to proceed?</h3>
                    <button type="button" id="confirm-button" onClick={clearFunction}>CONFIRM CLEAR</button>
                    <button type="button" id="cancel-button" onClick={() => cancelFunction(!modalForClears)}>CANCEL</button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction(!modalForClears)} />
                <div className="edit-item-modal">
                    <h3>Please make a selection.</h3>
                    <button type="button" id="ok-button" onClick={() => cancelFunction(!modalForClears)}>OK</button>
                </div>
            </>
        )
    }
}

export default ModalForClears
