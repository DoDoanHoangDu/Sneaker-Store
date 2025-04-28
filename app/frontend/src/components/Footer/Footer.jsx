import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-subscribe">
                <h1>Nhận tin khuyến mãi</h1>
                <img className='news' src="/newspaper-icon.png"  />
                <div className="subscribe-form">
                    <input type="email" placeholder="Nhập email để đăng ký nhận tin khuyến mãi từ topShoe" />
                    <button type="submit"><img src="/send-icon.png" alt="Send" /></button>
                </div>
            </div>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>VỀ TOPSHOE</h3>
                    <p>Giới thiệu</p>
                    <p>Tuyển dụng</p>
                    <p>Liên hệ</p>
                </div>
                <div className="footer-section">
                    <h3>CHÍNH SÁCH</h3>
                    <p>Chính sách bảo hành</p>
                    <p>Chính sách giao hàng</p>
                    <p>Chính sách bảo mật</p>
                </div>
                <div className="footer-section">
                    <h3>THÔNG TIN</h3>
                    <p>Hệ thống cửa hàng</p>
                    <p>Hướng dẫn mua hàng</p>
                    <p>Hướng dẫn thanh toán</p>
                    <p>Hướng dẫn trả góp</p>
                    <p>Tra cứu địa chỉ bảo hành</p>
                </div>
                <div className="footer-section">
                    <h3>TỔNG ĐÀI HỖ TRỢ 24/24</h3>
                    <p>Mua hàng: <a href="tel:123456789">123456789</a></p>
                    <p>Bảo hành: <a href="tel:123456789">123456789</a></p>
                    <p>Khiếu nại: <a href="tel:123456789">123456789</a></p>
                    <p>Email: <a href="mailto:cskh@topshoe.com">cskh@topshoe.com</a></p>
                </div>
                <div className="footer-section">
                    <h3>ĐƠN VỊ VẬN CHUYỂN</h3>
                    <p><img className="shipping-partners" src="/shipping-partners.png" alt="Shipping Partners" /></p>
                    <h3>CÁCH THỨC THANH TOÁN</h3>
                    <p><img className="payment-methods" src="/payment-methods.png" alt="Payment Methods" /></p>
                </div>
            </div>
            <div className="footer-bottom">
                <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
                <div className="social-icons">
                    <a href="#"><img src="/facebook-icon.png" alt="Facebook" /></a>
                    <a href="#"><img src="/tiktok-icon.png" alt="TikTok" /></a>
                    <a href="#"><img src="/youtube-icon.png" alt="YouTube" /></a>
                    <a href="#"><img src="/zalo-icon.png" alt="Zalo" /></a>
                    <a href="#"><img src="/group-icon.png" alt="Group" /></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;