import React from 'react';
import ProductSection from '../../components/ProductSection/ProductSection';
import Footer from '../../components/Footer/Footer';
import './MainPage.css';

function MainPage() {
    return (
        <div className="main-page">
            <ProductSection />
            <Footer />
        </div>
    );
}

export default MainPage;