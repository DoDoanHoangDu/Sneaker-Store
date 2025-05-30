import { useEffect } from 'react';
import ProductSection from '../../components/ItemComponents/ProductSlider/ProductSection';
import { useProduct } from '../../context/ProductContext';
import getFeaturedProducts from '../../customHook/getFeaturedProducts';
import './MainPage.css';

function MainPage() {
    const { featuredProducts, fetchFeaturedProducts, isLoading } = useProduct();
    useEffect(() => {
        const fetchFeatured = async () => {
            const ids = [];
            try {
                const products = await getFeaturedProducts();
                if (products) {
                    products.forEach(product => {
                        if (product.product_id) {
                            ids.push(product.product_id);
                        }
                    });
                    fetchFeaturedProducts(ids);
                } else {
                    console.error("No featured products found");
                }
            } catch (error) {
                alert("Error fetching featured products. Please try again later.");
            }
        };
        fetchFeatured();
        
    }, []);
    
    
    return (
        <div className="main-page">
            <ProductSection items={featuredProducts} isLoading={isLoading} />
        </div>
    );
}

export default MainPage;