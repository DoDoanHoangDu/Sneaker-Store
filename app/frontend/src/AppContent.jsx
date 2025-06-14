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
import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx';
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation.jsx';
import AdminAccountsTable from './Pages/AdminControl/AdminAcoountBoard.jsx';
import OrderSuccess from './Pages/OrderSuccess/OrderSuccess.jsx';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';
import Modal from "react-modal";
import OrderHistory from './Pages/OrderHistory/OrderHistory.jsx';

function AppContent() {
    const { cartItems } = useCart();

    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const navigate = useNavigate();

    const handleSearch = (keyword) => {
        navigate(`/store/${keyword}`);
        console.log("Search results:", keyword);
    };
    return (
        <>
            <Header onLoginClick={handleLoginClick} onSearch = {handleSearch}cartLength={cartItems.reduce((total, item) => total + item.quantity, 0)}/>
            <NavigationBar onSearch={handleSearch}/>            
            <Routes>          
                <Route path="/" element={<MainPage />} />
                <Route path="/store" element={<Store />} />
                <Route path="/store/:keyword" element={<Store/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/account" element={<UserProfile />} />
                <Route path="/admin" element={<AdminAccountsTable />} />
                <Route path="/item-creator" element={<ItemCreator />} />
                <Route path="/item-updater" element={<ItemUpdater />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/order-history" element={<OrderHistory />} />
                
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