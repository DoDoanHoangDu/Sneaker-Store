import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UserProfile.css';

function UserProfile() {
    const [selectedDate, setSelectedDate] = useState(null);

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