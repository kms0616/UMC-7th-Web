import styled from 'styled-components';
import Navbar from './components/Navbar';
import CardContainer from './components/CardContainer';
import Footer from './components/Footer';
import { useEffect } from 'react';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';
import useStore from './store/store'; // Zustand 스토어 import

function App() {
  const { cartItems, isOpen, calculateTotals, amount, total } = useStore();

  useEffect(() => {
    calculateTotals(); // 총합 계산
  }, [cartItems, calculateTotals]); // cartItems가 변경될 때마다 호출

  return (
    <Appcontainer>
      <header>
        <Navbar />
      </header>
      <main>
        <CardContainer />
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
            </Modal>
          </ModalPortal>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </Appcontainer>
  );
}

export default App;

const Appcontainer = styled.div`
  width: 100vw;
  align-items: center;
  flex-direction: column;
`;
