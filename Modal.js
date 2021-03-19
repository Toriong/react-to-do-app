import React, { useEffect } from 'react'

const Modal = ({ setModal, modal }) => {
    useEffect(() => {
        let closeModal = setTimeout(() => { setModal({ isOpen: false }) }, 3000)
        if (closeModal) {
            return () => {
                clearTimeout(closeModal);
            };
        };
    }, [modal, setModal])
    return <div className="modal-add-delete">{modal.content}</div>
}

export default Modal;
