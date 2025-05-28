import { useEffect, useRef, useState } from 'react';
import './ProductSection.css';
import ItemCard from '../ItemCard/ItemCard';

function ProductSection({ items = [], isLoading = false }) {
    const productGridRef = useRef(null);
    const [isManualScroll, setIsManualScroll] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (!isManualScroll && !isScrolling && productGridRef.current) {
                setIsScrolling(true);
                const cardWidth = productGridRef.current.querySelector('.card-container').offsetWidth;
                const gapSize = parseInt(window.getComputedStyle(productGridRef.current).gap);
                const scrollAmount = cardWidth + gapSize; // Scroll 1 card width + gap size

                if (productGridRef.current.scrollLeft + productGridRef.current.clientWidth >= productGridRef.current.scrollWidth) {
                    // If we've reached the end, scroll back to the beginning after 3 seconds
                    setTimeout(() => {
                        productGridRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                        setTimeout(() => {
                            setIsScrolling(false);
                        }, 1000); // Delay 1 second after reset
                    }, 3000);
                } else {
                    productGridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    setTimeout(() => {
                        setIsScrolling(false);
                    }, 1000); // Adjust this timeout to match the scroll duration
                }
            }
        }, 3000); // Scroll every 3 seconds

        return () => clearInterval(scrollInterval);
    }, [isManualScroll, isScrolling]);

    const handleScrollLeft = () => {
        if (productGridRef.current && !isScrolling) {
            setIsManualScroll(true);
            setIsScrolling(true);
            const cardWidth = productGridRef.current.querySelector('.card-container').offsetWidth;
            const gapSize = parseInt(window.getComputedStyle(productGridRef.current).gap);
            const scrollAmount = cardWidth + gapSize; // Scroll 1 card width + gap size

            if (productGridRef.current.scrollLeft <= 0) {
                // If we're at the beginning, scroll to the end
                productGridRef.current.scrollTo({ left: productGridRef.current.scrollWidth, behavior: 'smooth' });
                setTimeout(() => {
                    setIsScrolling(false);
                    resetManualScroll();
                }, 1000); // Delay 1 second after reset
            } else {
                productGridRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                setTimeout(() => {
                    setIsScrolling(false);
                    resetManualScroll();
                }, 1000); // Adjust this timeout to match the scroll duration
            }
        }
    };

    const handleScrollRight = () => {
        if (productGridRef.current && !isScrolling) {
            setIsManualScroll(true);
            setIsScrolling(true);
            const cardWidth = productGridRef.current.querySelector('.card-container').offsetWidth;
            const gapSize = parseInt(window.getComputedStyle(productGridRef.current).gap);
            const scrollAmount = cardWidth + gapSize; // Scroll 1 card width + gap size

            if (productGridRef.current.scrollLeft + productGridRef.current.clientWidth > productGridRef.current.scrollWidth - scrollAmount) {
                // If we've reached the end, scroll back to the beginning
                productGridRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                setTimeout(() => {
                    setIsScrolling(false);
                    resetManualScroll();
                }, 1000); // Delay 1 second after reset
            } else {
                productGridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                setTimeout(() => {
                    setIsScrolling(false);
                    resetManualScroll();
                }, 500); // Adjust this timeout to match the scroll duration
            }
        }
    };

    const resetManualScroll = () => {
        setTimeout(() => {
            setIsManualScroll(false);
        }, 2000); // Reset manual scroll after 5 seconds of inactivity
    };    return (
        <div className="product-section">
            <h2>Discover our featured products</h2>
            {isLoading ? (
                <div className="loading-container">
                    <p>Loading featured products...</p>
                </div>
            ) : (
                <div className="product-grid-container">
                    <button className="scroll-button left" onClick={handleScrollLeft}>&lt;</button>
                    <div className="product-grid" ref={productGridRef}>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index} className="card-container">
                                    <ItemCard item={item} />
                                </div>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                    <button className="scroll-button right" onClick={handleScrollRight}>&gt;</button>
                </div>
            )}
        </div>
    );
}

export default ProductSection;