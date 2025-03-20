import React, { useState } from 'react';
import Store from './Pages/Store/Store.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import Header from './components/Header/Header';
import LoginPage from './components/LoginBoard/LoginPage.jsx';
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
      <Header onLoginClick={handleLoginClick} />
      <Router>
        <Routes>
        <Route path="/" element = {<Store/>} />
          <Route path="/store" element = {<Store/>} />
          <Route path="/cart" element = {<Cart/>} />
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
    </>
  );
}

export default App;