import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile() {
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');

    const handleDobChange = (e) => {
        let value = e.target.value;
    
        // Remove any '/' entered by the user
        value = value.replace(/\//g, '');
    
        // Stop taking input if the length is greater than 8 (ddmmyyyy)
        if (value.length > 8) {
            return;
        }
    
        // Allow only numbers in the input
        const allowedPattern = /^[0-9]*$/;
        if (!allowedPattern.test(value)) {
            return; // Ignore invalid characters
        }
    
        // Restrict day (dd) input
        if (value.length === 1) {
            const firstDigit = parseInt(value[0], 10);
            if (firstDigit > 3) {
                setError('Ngày không hợp lệ.');
                return;
            }
        } else if (value.length === 2) {
            const firstDigit = parseInt(value[0], 10);
            const secondDigit = parseInt(value[1], 10);
            if (firstDigit === 3 && secondDigit > 1) {
                setError('Ngày không hợp lệ.');
                return;
            }
        }
    
        // Restrict month (mm) input
        if (value.length === 3) {
            const firstDigit = parseInt(value[2], 10); // First digit of month
            if (firstDigit > 1) {
                setError('Tháng không hợp lệ.');
                return;
            }
        } else if (value.length === 4) {
            const firstDigit = parseInt(value[2], 10);
            const secondDigit = parseInt(value[3], 10);
            if (firstDigit === 1 && secondDigit > 2) {
                setError('Tháng không hợp lệ.');
                return;
            }
        }
    
        // Automatically format the input as dd/mm/yyyy
        if (value.length > 2 && value.length <= 4) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        } else if (value.length > 4) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
        }
    
        // Update the input value
        setDob(value);
    
        // Validate the full date format
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // dd/mm/yyyy format
        if (datePattern.test(value)) {
            const [day, month, year] = value.split('/').map(Number);
    
            // Check for valid days in each month
            const daysInMonth = {
                1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
                7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31,
            };
    
            // Adjust for leap years
            if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) {
                daysInMonth[2] = 29;
            }
    
            if (day > daysInMonth[month]) {
                setError(`Tháng ${month} chỉ có ${daysInMonth[month]} ngày.`);
                return;
            }
    
            // Check if the entered date is after the current date
            const inputDate = new Date(year, month - 1, day); // JavaScript months are 0-based
            const currentDate = new Date();
            if (inputDate > currentDate) {
                setError('Ngày sinh không được lớn hơn ngày hiện tại.');
                return;
            }
    
            // Clear error if all validations pass
            setError('');
        } else if (value.length === 10) {
            setError('Ngày sinh phải có định dạng dd/mm/yyyy');
        } else {
            setError(''); // Allow partial input without error
        }
    };
    return (
        <div className="user-profile">
            <div className="form-container">
                {/* User Info Section */}
                <h2>Thông tin tài khoản</h2>
                <form className="user-info-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Họ Tên</label>
                            <input type="text" placeholder="Nhập họ tên" />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" placeholder="Nhập số điện thoại" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Nhập email" />
                        </div>
                        <div className="form-group">
                            <label>Ngày sinh</label>
                            <input
                                type="text"
                                value={dob}
                                onChange={handleDobChange}
                                placeholder="dd/mm/yyyy"
                                className="date-input"
                            />
                            {error && <span className="error-message">{error}</span>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Giới tính</label>
                            <div className="gender-options">
                                <label>
                                    <input type="radio" name="gender" value="male" defaultChecked /> Nam
                                </label>
                                <label>
                                    <input type="radio" name="gender" value="female" /> Nữ
                                </label>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Address Update Section */}
                <h2>Địa chỉ</h2>
                <form className="address-update-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Tỉnh/Thành phố</label>
                            <select>
                                <option>Chọn Tỉnh/Thành phố</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quận/Huyện</label>
                            <select>
                                <option>Chọn Quận/Huyện</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Phường/Xã</label>
                            <select>
                                <option>Chọn Phường/Xã</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Số nhà, địa chỉ</label>
                            <input type="text" placeholder="Nhập số nhà, địa chỉ" />
                        </div>
                    </div>
                </form>

                {/* Save Button */}
                <div className="form-actions">
                    <button type="submit" className="save-button">LƯU THAY ĐỔI</button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;