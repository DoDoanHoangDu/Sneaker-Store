import Modal from 'react-modal';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/useAuth.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import AppContent from './AppContent.jsx';

Modal.setAppElement('#root');

function App() {

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <AppContent/>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;