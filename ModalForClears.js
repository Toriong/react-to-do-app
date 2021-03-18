import React from 'react'


const ModalForClears = ({ cancelFunction, clearFunction, value }) => {
    if (value !== "please make a selection") {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction} />
                <div className="edit-item-modal">
                    <h3>You have selected "clear {value}."</h3>
                    <h3>Are sure you want to proceed?</h3>
                    <button type="button" id="confirm-button" onClick={clearFunction}>CONFIRM CLEAR</button>
                    <button type="button" id="cancel-button" onClick={() => cancelFunction}>CANCEL</button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div id="blocker" onClick={() => cancelFunction} />
                <div className="edit-item-modal">
                    <h3>Please {value}.</h3>
                    <button type="button" id="ok-button" onClick={() => cancelFunction}>OK</button>
                </div>
            </>
        )
    }
}

export default ModalForClears
