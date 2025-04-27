import { useEffect, useRef, useState } from 'react';
import './ProductSection.css';
import ItemCard from '../ItemCard/ItemCard';

function ProductSection() {
    const productGridRef = useRef(null);
    const [isManualScroll, setIsManualScroll] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const item1 = {
        image: '/shoe1.jpg',
        name: "Shoe 1",
        originalPrice: 200000,
        discountedPrice: 100000,
        link: "#"
    };
    const item2 = {
        image: '/shoe1.jpg',
        name: "Shoe 2",
        originalPrice: 400000,
        discountedPrice: 300000,
        link: "#"
    };
    const item3 = {
        image: '/shoe1.jpg',
        name: "Shoe 3",
        originalPrice: 100000,
        discountedPrice: 100000,
        link: "#"
    };
    const item4 = {
        image: '/shoe1.jpg',
        name: "Shoe 4",
        originalPrice: 250000,
        discountedPrice: 150000,
        link: "#"
    };
    const item5 = {
        image: '/shoe1.jpg',
        name: "Shoe 5",
        originalPrice: 300000,
        discountedPrice: 200000,
        link: "#"
    };
    const item6 = {
        image: '/shoe1.jpg',
        name: "Shoe 6",
        originalPrice: 350000,
        discountedPrice: 250000,
        link: "#"
    };
    const item7 = {
        image: '/shoe1.jpg',
        name: "Shoe 7",
        originalPrice: 400000,
        discountedPrice: 300000,
        link: "#"
    };
    const item8 = {
        image: '/shoe1.jpg',
        name: "Shoe 8",
        originalPrice: 450000,
        discountedPrice: 350000,
        link: "#"
    };
    const item9 = {
        image: '/shoe1.jpg',
        name: "Shoe 9",
        originalPrice: 500000,
        discountedPrice: 400000,
        link: "#"
    };
    const item10 = {
        image: '/shoe1.jpg',
        name: "Shoe 10",
        originalPrice: 550000,
        discountedPrice: 450000,
        link: "#"
    };
    const item11 = {
        image: '/shoe1.jpg',
        name: "Shoe 11",
        originalPrice: 350000,
        discountedPrice: 280000,
        link: "#"
    };

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
    };

    return (
        <div className="product-section">
            <h2>Discover our Best-seller products</h2>
            <div className="product-grid-container">
                <button className="scroll-button left" onClick={handleScrollLeft}>&lt;</button>
                <div className="product-grid" ref={productGridRef}>
                    <div className="card-container"><ItemCard item={item1} /></div>
                    <div className="card-container"><ItemCard item={item2} /></div>
                    <div className="card-container"><ItemCard item={item3} /></div>
                    <div className="card-container"><ItemCard item={item4} /></div>
                    <div className="card-container"><ItemCard item={item5} /></div>
                    <div className="card-container"><ItemCard item={item6} /></div>
                    <div className="card-container"><ItemCard item={item7} /></div>
                    <div className="card-container"><ItemCard item={item8} /></div>
                    <div className="card-container"><ItemCard item={item9} /></div>
                    <div className="card-container"><ItemCard item={item10} /></div>
                    <div className="card-container"><ItemCard item={item11} /></div>
                </div>
                <button className="scroll-button right" onClick={handleScrollRight}>&gt;</button>
            </div>
        </div>
    );
}

export default ProductSection;