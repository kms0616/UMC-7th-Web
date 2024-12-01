import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
    //const state = useSelector((store) => store.cart);
    //console.log(state);
    const { cartItems, total, amount }= useSelector((store) => store.cart);
    const dispatch = useDispatch();
    return (
        <Cart>
            <header>
                <h2>당신이 선택한 음반</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key = {item.id} {...item} />
                })}
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>총 가격</h4>
                    <span>\ {total}원</span>
                </div>
                <button className="btn clear-btn" onClick={() => {
                    dispatch(openModal());
                }} >
                    장바구니 초기화
                </button>
            </footer>
        </Cart>
    );
};

export default CartContainer;

const Cart = styled.section`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    header {
        text-align: center;
        margin-bottom: 20px;
        h2 {
            font-size: 24px;
            font-weight: bold;
        }
    }

    .cart-items {
        margin-bottom: 20px;
    }

    footer {
        text-align: center;
        hr {
            margin: 20px 0;
            border: 0;
            height: 1px;
            background: #ccc;
        }

        .cart-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            h4 {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
            }

            span {
                font-size: 18px;
                font-weight: bold;
                color: #333;
            }     
        }

        .clear-btn {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background: #c0392b;
            }
        }
    }
`;