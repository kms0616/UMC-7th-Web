import styled from "styled-components";
import { ChevronDown, ChevronUp } from "../constants/icons";
import useStore from "../store/store"; // Zustand 사용

const CartItem = ({ id, title, singer, price, img, amount }) => {
    const { increase, decrease, removeItem } = useStore();

    return (
        <Wrapper>
            <img src={img} alt={`${title} 이미지`} />
            <div className="info">
                <h4 className="title">
                    {title} | {singer}
                </h4>
                <h4 className="item-price">\ {price}</h4>
            </div>
            <div className="actions">
                <button className="amount-btn" onClick={() => increase(id)}>
                    <ChevronUp />
                </button>
                <p className="amount">{amount}</p>
                <button className="amount-btn" onClick={() => {
                    if (amount === 1) {
                        removeItem(id);
                        return;
                    }
                    decrease(id);
                }}>
                    <ChevronDown />
                </button>
            </div>
        </Wrapper>
    );
};

export default CartItem;


const Wrapper = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ccc;

    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
    }

    .info {
        flex: 1;
        margin-left: 16px;

        .title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .item-price {
            color: #888;
            font-size: 14px;
        }
    }

    .actions {
        display: flex;
        flex-direction: column;
        align-items: center;

        .amount-btn {
            background-color: white;
            color: black;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            padding: 8px;
            margin: 4px 0;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                width: 16px;
                height: 16px;
            }
        }

        .amount-btn:hover {
            background-color: #ccc;
        }

        .amount {
            font-size: 16px;
            font-weight: bold;
        }
    }
`;