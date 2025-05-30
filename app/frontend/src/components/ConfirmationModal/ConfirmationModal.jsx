import Modal from "react-modal";
import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, onConfirm, onCancel, message = "Are you sure?" }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            contentLabel="Confirmation Modal"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>Xác nhận</h2>
            <p>{message}</p>
            <div className="modal-buttons">
                <button onClick={onConfirm}>Đồng ý</button>
                <button onClick={onCancel}>Huỷ</button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;
