import Modal from 'react-modal';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './customHook/useAuth.jsx';
import AppContent from './AppContent.jsx';

Modal.setAppElement('#root');

function App() {

  return (
    <Router>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </Router>
  );
}

export default App;