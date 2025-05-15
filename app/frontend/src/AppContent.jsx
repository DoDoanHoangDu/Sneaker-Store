import { useState } from 'react';
import Store from './Pages/Store/Store.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import MainPage from './Pages/MainPage/MainPage.jsx';
import Header from './components/HeaderComponents/Header/Header.jsx';
import LoginPage from './components/HeaderComponents/LoginBoard/LoginPage.jsx';
import NavigationBar from './components/HeaderComponents/NavigationBar/NavigationBar.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import UserProfile from './Pages/UserProfile/UserProfile.jsx';
import ItemUpdater from './Pages/ItemUpdater/ItemUpdater.jsx';
import ItemCreator from './Pages/ItemCreator/ItemCreator.jsx';
import {Routes, Route, useNavigate } from 'react-router-dom';
import Modal from "react-modal";

function AppContent() {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (results) => {
        setSearchResults(results);
        navigate("/store");
        console.log("Search results:", results);
    };
    return (
        <>
            <Header onLoginClick={handleLoginClick} onSearch = {handleSearch}/>
            <NavigationBar onSearch={handleSearch}/>
            <Routes>          
                <Route path="/" element={<MainPage />} />
                <Route path="/store" element={<Store items = {searchResults}/>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<UserProfile />} />
                <Route path="/admin" element={<MainPage adminForce={true} />} />
                <Route path="/itemcreator" element={<ItemCreator />} />
                <Route path="/itemupdater" element={<ItemUpdater />} />
            </Routes>
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
    )
}

export default AppContent;