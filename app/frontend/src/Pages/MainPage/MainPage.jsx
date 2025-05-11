import ProductSection from '../../components/ItemComponents/ProductSlider/ProductSection';
import AdminAccountsTable from '../AdminControl/AdminAcoountBoard';
import { useAuth } from '../../customHook/useAuth';
import './MainPage.css';

function MainPage({ adminForce = false }) {
    const { isLoggedIn, userRole, isAdmin } = useAuth();
      console.log('MainPage rendering - isLoggedIn:', isLoggedIn);
    console.log('MainPage rendering - userRole:', userRole);
    console.log('MainPage rendering - isAdmin:', isAdmin);
    
    // Force the component to detect the role change or use adminForce parameter
    // Use the isAdmin value from useAuth which has the correct case-insensitive check
    const showAdminDashboard = isAdmin || adminForce;
    
    console.log('MainPage - showing admin dashboard?', showAdminDashboard);
    
    return (
        <div className="main-page">
            {showAdminDashboard ? (
                <AdminAccountsTable/>
            ) : (
                <ProductSection/>
            )}
        </div>
    );
}

export default MainPage;