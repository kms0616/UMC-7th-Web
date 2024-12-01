import styled from "styled-components";
import useStore from "../store/store"; // Zustand 사용

const ModalButton = () => {
    const { clearCart, closeModal } = useStore();

    return (
        <ButtonContainer>
            <ConfirmButton onClick={() => {
                clearCart();
                closeModal();
            }}>
                네
            </ConfirmButton>
            <CancelButton onClick={() => closeModal()}>
                아니요
            </CancelButton>
        </ButtonContainer>
    );
};

export default ModalButton;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.button` 
  background-color: #9cc5e2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7baedb; /* 조금 더 어두운 하늘색 */
  }
`;

const CancelButton = styled.button`
  background-color: #9cc5e2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7baedb; /* 조금 더 어두운 하늘색 */
  }
`;

