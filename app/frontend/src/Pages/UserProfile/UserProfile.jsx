import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UserProfile.css';
import { useAuth } from '../../context/useAuth';
import { fetchProvinces, fetchDistrictsByProvince, fetchWardsByDistrict } from '../../utils/locationData';

function UserProfile() {
    const { isLoggedIn, username } = useAuth();
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
    };    // Handle address change
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
                    const response = await fetch('http://127.0.0.1:8000/auth/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                        }
                    });
                    
                    if (response.ok) {
                        const userData = await response.json();
                        
                        // Update form data with user info
                        setFormData({
                            full_name: userData.full_name || '',
                            phone_number: userData.phone_number || '',
                            email: userData.email || '',
                            sex: userData.sex || 'male'
                        });
                        
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
    }, [isLoggedIn]);
    
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

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/me/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''}`
                },
                body: JSON.stringify(formattedData)
            });

            if (response.ok) {
                setMessage('Thông tin đã được cập nhật thành công!');
                // You could update the auth context here if needed
            } else {
                const errorData = await response.json();
                setMessage(`Lỗi: ${errorData.detail || 'Không thể cập nhật thông tin'}`);
            }
        } catch (error) {
            setMessage(`Có lỗi xảy ra: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="user-profile">
            <div className="form-container">                {/* User Info Section */}                
                <h2>Thông tin tài khoản</h2>
                {!isLoggedIn ? (
                    <div className="not-logged-in-message">
                        Vui lòng đăng nhập để cập nhật thông tin cá nhân.
                    </div>
                ) : (
                    <>
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
                            <h2>Địa chỉ</h2>                            <div className="form-row">
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
                                <button 
                                    type="submit" 
                                    className="save-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'ĐANG LƯU...' : 'LƯU THAY ĐỔI'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserProfile;