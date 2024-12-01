import styled from 'styled-components';
import Navbar from './components/Navbar';
import CardContainer from './components/CardContainer';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { calculateTotals } from './features/cart/cartSlice';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])
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
  width:100vw;
  align-items: center;
  flex-direction:column;
`
