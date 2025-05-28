import { createContext, useState, useContext, useEffect } from 'react';
import getItemById from '../customHook/getItemById';

// Create a context
export const ProductContext = createContext(null);

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  
  // Default IDs for featured products if none are specified
  const defaultFeaturedIds = [1];

  // Function to fetch products - can be called from components
  const fetchFeaturedProducts = async (ids = defaultFeaturedIds) => {
    // Only fetch if we haven't fetched before or it's been at least 30 minutes since the last fetch
    const shouldFetch = !lastFetchTime || (Date.now() - lastFetchTime > 30 * 60 * 1000);
    
    if (shouldFetch && !isLoading && (featuredProducts.length === 0 || ids.toString() !== defaultFeaturedIds.toString())) {
      try {
        setIsLoading(true);
        console.log('Fetching featured products...');
        
        const fetchedItems = await Promise.all(
          ids.map(id => getItemById(id))
        );
        
        const validItems = fetchedItems.filter(item => item !== null);
        setFeaturedProducts(validItems);
        setLastFetchTime(Date.now());
        
        console.log('Featured products fetched:', validItems.length);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (featuredProducts.length > 0) {
      console.log('Using cached featured products');
    }
  };

  // Create the value object
  const value = {
    featuredProducts,
    isLoading,
    lastFetchTime,
    fetchFeaturedProducts
  };

  // Return the provider with the value
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// Create a hook for using the product context
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
