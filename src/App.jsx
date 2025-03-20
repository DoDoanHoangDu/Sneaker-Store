import React, { useState } from 'react';
import Store from './Pages/Store/Store.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import Header from './components/HeaderComponents/Header/Header.jsx';
import LoginPage from './components/HeaderComponents/LoginBoard/LoginPage.jsx';
import NavigationBar from './components/HeaderComponents/NavigationBar/NavigationBar.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Modal from 'react-modal';
import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';

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
      <Header onLoginClick={handleLoginClick}/>
      <NavigationBar/>
      <Router>
        <Routes>
        <Route path="/" element = {<Store/>} />
          <Route path="/store" element = {<Store/>} />
          <Route path="/cart" element = {<Cart/>} />
          <Route path="/about" element = {<Store/>} />
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
      <ScrollToTop/>
    </>
  );
}

export default App;