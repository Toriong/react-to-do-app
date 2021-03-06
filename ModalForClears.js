import React from 'react'
// how to set the default value of an input

const ModalForClears = ({ cancelFunction, clearFunction, getClearOptionValue, modalForClears }) => {
    debugger
    if (getClearOptionValue === "CLEAR TO-DOS" || getClearOptionValue === "CLEAR COMPLETIONS") {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction(!modalForClears)} />
                <div className="edit-item-modal">
                    <h3>You have selected "{getClearOptionValue}"</h3>
                    <h3 >Are sure you want to proceed?</h3>
                    <button type="button" id="confirm-button" onClick={clearFunction}>CONFIRM CLEAR</button>
                    <button type="button" id="cancel-button" onClick={() => cancelFunction(!modalForClears)}>CANCEL</button>
                </div>
            </>
        );
    } else if (getClearOptionValue === "CLEAR COMPLETIONS") {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction(!modalForClears)} />
                <div className="edit-item-modal">
                    <h3>You have selected "{getClearOptionValue}"</h3>
                    <h3 >Are sure you want to proceed?</h3>
                    <button type="button" id="confirm-button" onClick={clearFunction}>CONFIRM CLEAR</button>
                    <button type="button" id="cancel-button" onClick={() => cancelFunction(!modalForClears)}>CANCEL</button>
                </div>
            </>
        );
    } else if (getClearOptionValue === "CLEAR ALL") {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction(!modalForClears)} />
                <div className="edit-item-modal">
                    <h3>You have selected "{getClearOptionValue}"</h3>
                    <h3 >Are sure you want to proceed?</h3>
                    <button type="button" id="confirm-button" onClick={clearFunction}>CONFIRM CLEAR</button>
                    <button type="button" id="cancel-button" onClick={() => cancelFunction(!modalForClears)}>CANCEL</button>
                </div>
            </>
        )
    } else if (getClearOptionValue === " " || "make a selection") {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction(!modalForClears)} />
                <div className="edit-item-modal">
                    <h3>Please make a selection.</h3>
                    <button type="button" id="cancel-button" onClick={() => cancelFunction(!modalForClears)}>OK</button>
                </div>
            </>
        )
    }
}

export default ModalForClears
