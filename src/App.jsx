import styled from 'styled-components';
import Navbar from './components/Navbar';
import CardContainer from './components/CardContainer';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { calculateTotals } from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

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
