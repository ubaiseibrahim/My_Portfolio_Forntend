import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const ConfirmModal = ({ show, onClose, onConfirm, title, body, confirmText = 'Delete', cancelText = 'Cancel', isDanger = true }) => {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            modalInstance.current = new window.bootstrap.Modal(modalElement);
            modalElement.addEventListener('hidden.bs.modal', onClose);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('hidden.bs.modal', onClose);
            }
            if (modalInstance.current) {
                modalInstance.current.dispose();
            }
        };
    }, [onClose]);

    useEffect(() => {
        if (modalInstance.current) {
            if (show) {
                modalInstance.current.show();
            } else {
                modalInstance.current.hide();
            }
        }
    }, [show]);

    return ReactDOM.createPortal(
        <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>{cancelText}</button>
                        <button
                            type="button"
                            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;
