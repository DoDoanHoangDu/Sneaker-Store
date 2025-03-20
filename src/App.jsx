import React, { useState } from 'react';
import Store from './Store/Store';
import Header from './components/Header/Header';
import LoginPage from './LoginPage/LoginPage.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This is important for accessibility

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
      <Store />
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