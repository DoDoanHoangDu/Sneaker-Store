import { useState } from 'react';
import Store from './Pages/Store/Store.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import MainPage from './Pages/MainPage/MainPage.jsx';
import Header from './components/HeaderComponents/Header/Header.jsx';
import LoginPage from './components/HeaderComponents/LoginBoard/LoginPage.jsx';
import NavigationBar from './components/HeaderComponents/NavigationBar/NavigationBar.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import Modal from 'react-modal';
import UserProfile from './Pages/UserProfile/UserProfile.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemUpdater from './Pages/ItemUpdater/ItemUpdater.jsx';
import ItemCreator from './Pages/ItemCreator/ItemCreator.jsx';

Modal.setAppElement('#root');

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <Header onLoginClick={handleLoginClick} />
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<UserProfile />} />
          <Route path="/itemcreator" element={<ItemCreator />} />
          <Route path="/itemupdater" element={<ItemUpdater />} />
        </Routes>
      </Router>
      <Modal
        isOpen={showLogin}
        onRequestClose={handleCloseLogin}
        contentLabel="Login Modal"
        className="login-modal"
        overlayClassName="login-modal-overlay"
      >
        <LoginPage onClose={handleCloseLogin} />
      </Modal>
      <ScrollToTop />
      
      <Footer />
    </>
  );
}

export default App;