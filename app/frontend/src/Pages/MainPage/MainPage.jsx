import { useEffect } from 'react';
import ProductSection from '../../components/ItemComponents/ProductSlider/ProductSection';
import { useAuth } from '../../context/useAuth';
import { useProduct } from '../../context/ProductContext';
import './MainPage.css';

function MainPage() {
    const { isLoggedIn, userRole, isAdmin } = useAuth();
    const { featuredProducts, fetchFeaturedProducts, isLoading } = useProduct();
    
    console.log('MainPage rendering - isLoggedIn:', isLoggedIn);
    console.log('MainPage rendering - userRole:', userRole);
    console.log('MainPage rendering - isAdmin:', isAdmin);
    
    // Fetch featured products only once when component mounts
    useEffect(() => {
        fetchFeaturedProducts([204,205,206,202,203,207,208,209,210]);
        // No dependencies array means this effect runs only once when component mounts
    }, []);
    
    return (
        <div className="main-page">
            <ProductSection items={featuredProducts} isLoading={isLoading} />
        </div>
    );
}

export default MainPage;