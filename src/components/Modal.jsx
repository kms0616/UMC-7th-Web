import ModalButton from "./ModalButton";
import styled from "styled-components";

const Modal = ({ children }) => {
    return (
        <ModalContainer>
            <ModalContent>
                {children}
                <ModalButton />
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 최상위로 보이도록 설정 */
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 90%;
    max-width: 400px;

    h4 {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #333;
    }
`;
