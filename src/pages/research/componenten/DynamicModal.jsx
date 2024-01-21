// DynamicModal.js
import {Button, Modal} from "@components";
// DynamicModal.js

const DynamicModal = ({ isOpen, message, onClose, onRedirect, redirectLabel }) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="modal-content">
                <p className="text">{message}</p>
                {onRedirect &&
                    <Button  onClick={onRedirect}>{redirectLabel || 'Ga Verder'}</Button>
                }
            </div>
        </Modal>
    );
};

export default DynamicModal;

