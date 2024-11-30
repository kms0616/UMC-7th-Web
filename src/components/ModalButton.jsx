import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const ModalButton = () => {
    const dispatch = useDispatch();
    return (
        <div className="btn-container">
            <button type = "button" className="btn confirm-btn" onClick={() => {
                dispatch(clearCart());
            }}>
                네
            </button>
            <button type = "button" className="btn clear-btn" onClick={() => {}}>
                아니요
            </button>
        </div>
    );
};

export default ModalButton;