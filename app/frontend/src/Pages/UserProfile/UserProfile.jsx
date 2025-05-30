import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UserProfile.css';
import { useAuth } from '../../context/useAuth';
import { fetchProvinces, fetchDistrictsByProvince, fetchWardsByDistrict } from '../../utils/locationData';
import { FaUser } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import createOrder from '../../customHook/createOrder';
import formatPrice from '../../customHook/formatPrice';
import formatDate from '../../customHook/formatDate';
import formatGender from '../../customHook/formatGender';
import formatAddress from '../../customHook/formatAddress';
import getItemById from '../../customHook/getItemById';

function UserProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn, username, userData } = useAuth();
    const [selectedDate, setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        email: '',
        address: '',
        sex: 'male'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [addressData, setAddressData] = useState({
        city: '',
        district: '',
        ward: '',
        street_address: ''
    });
    
    // User profile data for display
    const [profileData, setProfileData] = useState({
        username: username || '',
        full_name: '',
        email: '',
        phone_number: '',
        dob: '',
        sex: '',
        address: '',
        role: ''
    });

    const [userOrderData, setUserOrderData] = useState({
        account_id: null,
        customer_name: '',
        customer_phone: '',
        customer_address: '',
        ordered_time: '',
        delivery_method:'tiêu chuẩn'
    });

    const { cartItems, clearCart  } = useCart();
    const [detailedItems, setDetailedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
    const fetchItems = async () => {
        const results = await Promise.all(cartItems.map(i => getItemById(i.product_id)));

        const mergedItems = [];

        results.forEach((item, index) => {
            if (item) {
                mergedItems.push({
                ...item,
                quantity: cartItems[index].quantity,
                size: cartItems[index].size,
                product_id: cartItems[index].product_id
                });
            } else {
                const invalidItem = cartItems[index];
                removeFromCart(invalidItem.product_id, invalidItem.size);
            }
            });

            setDetailedItems(mergedItems);
        };
        fetchItems();
    }, [cartItems]);

    useEffect(() => {
        const total = detailedItems.reduce((sum, item) => {
            const discounted = Math.round(item.price * (1 - item.discount) / 1000) * 1000;
            return sum + discounted * item.quantity;
        }, 0);
        if (userOrderData.delivery_method === 'nhanh') {
            setTotalPrice(total + 50000);
        }
        else {
            setTotalPrice(total + 30000);
        }
    }, [detailedItems, userOrderData.delivery_method]);
    
    // Location data lists
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle address change
    const handleAddressChange = async (e) => {
        const { name, value } = e.target;
        
        // Update the address data state
        setAddressData({
            ...addressData,
            [name]: value
        });
        
        // Handle location selection and cascading updates
        if (name === 'city') {
            const selectedProvince = provinces.find(province => province.name === value);
            setSelectedProvince(selectedProvince);
            
            if (selectedProvince) {
                // Reset district and ward when province changes
                setAddressData(prev => ({
                    ...prev,
                    district: '',
                    ward: ''
                }));
                
                // Fetch districts for the selected province
                const districtData = await fetchDistrictsByProvince(selectedProvince.code);
                setDistricts(districtData);
                setWards([]);
            }
        } 
        else if (name === 'district') {
            const selectedDistrict = districts.find(district => district.name === value);
            setSelectedDistrict(selectedDistrict);
            
            if (selectedDistrict) {
                // Reset ward when district changes
                setAddressData(prev => ({
                    ...prev,
                    ward: ''
                }));
                
                // Fetch wards for the selected district
                const wardData = await fetchWardsByDistrict(selectedDistrict.code);
                setWards(wardData);
            }
        }
    };    // Fetch user data if logged in
    useEffect(() => {
        if (isLoggedIn) {
            const fetchUserData = async () => {
                try {
                    const storedUser = localStorage.getItem('user');
                    if (!storedUser) return;
                    
                    const { access_token } = JSON.parse(storedUser);
                    
                    const response = await fetch('http://127.0.0.1:8000/auth/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    });
                    
                    if (response.ok) {
                        const userData = await response.json();
                        
                        // Set profile data for display
                        setProfileData({
                            username: userData.username || username || '',
                            full_name: userData.full_name || '',
                            email: userData.email || '',
                            phone_number: userData.phone_number || '',
                            dob: userData.dob || '',
                            sex: userData.sex || '',
                            address: userData.address || '',
                            role: userData.role || ''
                        });
                        
                        // Update form data with user info
                        setFormData({
                            full_name: userData.full_name || '',
                            phone_number: userData.phone_number || '',
                            email: userData.email || '',
                            sex: userData.sex || 'male'
                        });

                        setUserOrderData({
                            ...userOrderData,
                            account_id: userData.account_id || null,
                            customer_name: userData.full_name || '',
                            customer_phone: userData.phone_number || '',
                            customer_address: userData.address || '',
                            ordered_time: new Date().toISOString(),
                        })
                        
                        // Set date of birth if available
                        if (userData.dob) {
                            setSelectedDate(new Date(userData.dob));
                        }
                        
                        // Parse address if available
                        if (userData.address) {
                            parseAndSetAddress(userData.address);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            
            fetchUserData();
        }
    }, [isLoggedIn, username]);
    
    // Helper function to parse full address into components
    const parseAndSetAddress = (fullAddress) => {
        if (!fullAddress) return;
        
        // Expected format: street_address, ward, district, city, Việt Nam
        const addressParts = fullAddress.split(',').map(part => part.trim());
        
        if (addressParts.length >= 4) {
            // Extract components from the end of the array
            const city = addressParts[addressParts.length - 2];
            const district = addressParts[addressParts.length - 3];
            const ward = addressParts[addressParts.length - 4];
            
            // Everything else is the street address
            const streetAddress = addressParts.slice(0, addressParts.length - 4).join(', ');
            
            setAddressData({
                city,
                district, 
                ward,
                street_address: streetAddress
            });
            
            // Trigger loading of districts and wards
            const loadLocationData = async () => {
                // Find province by name
                const provinceData = await fetchProvinces();
                setProvinces(provinceData);
                
                const province = provinceData.find(p => p.name === city);
                if (province) {
                    setSelectedProvince(province);
                    
                    // Load districts
                    const districtData = await fetchDistrictsByProvince(province.code);
                    setDistricts(districtData);
                    
                    // Find district by name
                    const districtObj = districtData.find(d => d.name === district);
                    if (districtObj) {
                        setSelectedDistrict(districtObj);
                        
                        // Load wards
                        const wardData = await fetchWardsByDistrict(districtObj.code);
                        setWards(wardData);
                    }
                }
            };
            
            loadLocationData();
        }
    };
    
    // Load provinces when component mounts
    useEffect(() => {
        const loadProvinces = async () => {
            const provinceData = await fetchProvinces();
            setProvinces(provinceData);
        };
        
        loadProvinces();
    }, []);    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        // Validate address fields
        if (!addressData.city || !addressData.district || !addressData.ward || !addressData.street_address) {
            setMessage('Lỗi: Vui lòng điền đầy đủ thông tin địa chỉ');
            setIsLoading(false);
            return;
        }

        // Combine address data into a single string
        const fullAddress = `${addressData.street_address}, ${addressData.ward}, ${addressData.district}, ${addressData.city}, Việt Nam`;

        // Format the date to ISO string if available
        const formattedData = {
            ...formData,
            dob: selectedDate ? selectedDate.toISOString() : null,
            address: fullAddress
        };

        const submitUserOrderData = {
            ...userOrderData,
            customer_address: fullAddress,
            ordered_time: new Date().toISOString(),
        };

        const submitCartData = detailedItems.map(item => ({
            product_id: item.product_id,
            size: item.size,
            product_price: Math.round(item.price * (1 - item.discount) / 1000) * 1000,
            quantity: item.quantity
        }));


        if (location.pathname === '/orderconfirmation') {
            try {
                const orderResponse = await createOrder(submitUserOrderData, submitCartData,totalPrice);
                if (orderResponse) {
                    setMessage('Đơn hàng đã được tạo thành công!');
                    navigate('/ordersuccess', {replace: true, state: { fromTrigger: true } });
                    clearCart();
                } else {
                    setMessage('Lỗi: Không thể tạo đơn hàng');
                }
            } catch (error) {
                setMessage(`Có lỗi xảy ra khi tạo đơn hàng: ${error.message}`);
                console.error('Order creation error:', error);
            }
            setIsLoading(false);
        } 
        else {
            try {
                const storedUser = localStorage.getItem('user');
                if (!storedUser) {
                    setMessage('Lỗi: Không tìm thấy thông tin đăng nhập');
                    setIsLoading(false);
                    return;
                }
                
                const { access_token } = JSON.parse(storedUser);
                
                const response = await fetch('http://127.0.0.1:8000/auth/me/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: JSON.stringify(formattedData)
                });

                if (response.ok) {
                    const updatedData = await response.json();
                    
                    // Update the profile display data
                    setProfileData({
                        ...profileData,
                        full_name: updatedData.full_name || '',
                        email: updatedData.email || '',
                        phone_number: updatedData.phone_number || '',
                        dob: updatedData.dob || '',
                        sex: updatedData.sex || '',
                        address: updatedData.address || ''
                    });
                    
                    setMessage('Thông tin đã được cập nhật thành công!');
                } else {
                    const errorData = await response.json();
                    setMessage(`Lỗi: ${errorData.detail || 'Không thể cập nhật thông tin'}`);
                }
            } catch (error) {
                setMessage(`Có lỗi xảy ra: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="user-profile">
            {!isLoggedIn && !(location.pathname === '/orderconfirmation') ? (
                <div className="form-container">
                    <div className="not-logged-in-message">
                        Vui lòng đăng nhập để xem và cập nhật thông tin cá nhân.
                    </div>
                </div>
            ) : (
                <div className="profile-layout">
                    {/* Profile Display Section */}
                    <div className="profile-display">                        <div className="profile-photo">
                            <div className="profile-photo-placeholder">
                                <FaUser size={70} />
                            </div>
                        </div>
                        
                        <div className="profile-info">
                            <h2 className="profile-name">{profileData.full_name || 'Chưa cập nhật'}</h2>
                            <div className="profile-username">@{profileData.username}</div>
                            
                            <div className="profile-details">
                                <div className="profile-detail">
                                    <div className="profile-detail-label">Vai trò:</div>
                                    <div className="profile-detail-value">{profileData.role || 'Customer'}</div>
                                </div>
                                
                                <div className="profile-detail">
                                    <div className="profile-detail-label">Email:</div>
                                    <div className="profile-detail-value">{profileData.email || 'Chưa cập nhật'}</div>
                                </div>
                                
                                <div className="profile-detail">
                                    <div className="profile-detail-label">Số điện thoại:</div>
                                    <div className="profile-detail-value">{profileData.phone_number || 'Chưa cập nhật'}</div>
                                </div>
                                
                                <div className="profile-detail">
                                    <div className="profile-detail-label">Ngày sinh:</div>
                                    <div className="profile-detail-value">{formatDate(profileData.dob) || 'Chưa cập nhật'}</div>
                                </div>
                                
                                <div className="profile-detail">
                                    <div className="profile-detail-label">Giới tính:</div>
                                    <div className="profile-detail-value">{formatGender(profileData.sex) || 'Chưa cập nhật'}</div>
                                </div>
                                
                                <div className="profile-detail">
                                    <div className="profile-detail-label">Địa chỉ:</div>
                                    <div className="profile-detail-value">{formatAddress(profileData.address) || 'Chưa cập nhật'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Form Container Section */}
                    <div className="form-container">
                        <h2>Cập nhật thông tin</h2>
                        
                        {message && (
                            <div className={`message ${message.includes('Lỗi') ? 'error' : 'success'}`}>
                                {message}
                            </div>
                        )}
                        
                        <form className="user-info-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Họ Tên</label>
                                    <input 
                                        type="text" 
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        placeholder="Nhập họ tên" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input 
                                        type="text" 
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                        placeholder="Nhập số điện thoại" 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Nhập email" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ngày sinh</label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="DD/MM/YYYY"
                                        className="date-picker"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Giới tính</label>
                                    <div className="gender-options">
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="sex" 
                                                value="male" 
                                                checked={formData.sex === 'male'}
                                                onChange={handleInputChange}
                                            /> Nam
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="sex" 
                                                value="female" 
                                                checked={formData.sex === 'female'}
                                                onChange={handleInputChange}
                                            /> Nữ
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Address Update Section */}
                            <h2>Địa chỉ</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tỉnh/Thành phố</label>
                                    <select 
                                        name="city" 
                                        value={addressData.city}
                                        onChange={handleAddressChange}
                                    >
                                        <option value="">Chọn Tỉnh/Thành phố</option>
                                        {provinces.map(province => (
                                            <option key={province.code} value={province.name}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Quận/Huyện</label>
                                    <select
                                        name="district"
                                        value={addressData.district}
                                        onChange={handleAddressChange}
                                        disabled={!addressData.city}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map(district => (
                                            <option key={district.code} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phường/Xã</label>
                                    <select
                                        name="ward"
                                        value={addressData.ward}
                                        onChange={handleAddressChange}
                                        disabled={!addressData.district}
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map(ward => (
                                            <option key={ward.code} value={ward.name}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Số nhà, địa chỉ</label>
                                    <input 
                                        type="text" 
                                        name="street_address"
                                        value={addressData.street_address}
                                        onChange={handleAddressChange}
                                        placeholder="Nhập số nhà, địa chỉ" 
                                    />
                                </div>
                            </div>


                            {/* Save Button */}
                            <div className="form-actions">
                                <label className='delivery-method-label'>Phương pháp giao hàng</label>
                                <label>
                                    <input type='radio' value={"tiêu chuẩn"} checked={userOrderData.delivery_method === "tiêu chuẩn"} onChange={(e) => setUserOrderData({...userOrderData,delivery_method: e.target.value})}/>
                                    Giao hàng tiêu chuẩn (trong ngày / 30k)
                                </label>

                                <label>
                                    <input type='radio' value={"nhanh"} checked={userOrderData.delivery_method === "nhanh"} onChange={(e) => setUserOrderData({...userOrderData,delivery_method: e.target.value})}/>
                                    Giao hàng nhanh (2 - 3h / 50k)
                                </label>
                                <div className="total-price">
                                    <div className="total-price-label">Tổng tiền:</div>
                                    <div className="total-price-number">{formatPrice(totalPrice)}₫</div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="save-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'ĐANG LƯU...' : 'LƯU THÔNG TIN'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;