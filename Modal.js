import React, { useEffect } from 'react'

const Modal = ({ setModal, modalState }) => {
    useEffect(() => {
        setTimeout(() => {
            setModal({
                isOpen: false,
                modalContent: " "
            })
        }, 3000)
    })
    return (
        <div className="modal-add-delete">
            {modalState.modalContent}
        </div>
    );
}

export default Modal
