import Modal from 'react-modal';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/useAuth.jsx';
import { CartProvider } from './context/CartContext.jsx';
import AppContent from './AppContent.jsx';

Modal.setAppElement('#root');

function App() {

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent/>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;