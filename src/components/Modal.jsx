import { Children } from "react";
import ModalButton from "./ModalButton";

const Modal = ({Children}) => {
    return (
        <aside className="modal-container" onClick={(e) => {}}>
            <div className="modal">
                {Children}
                <ModalButton />
            </div>
        </aside>
    );
};

export default Modal;