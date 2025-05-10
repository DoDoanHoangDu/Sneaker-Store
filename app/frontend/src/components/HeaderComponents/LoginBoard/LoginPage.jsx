import './login.css';
import Loginapp from './loginapp.jsx';

const LoginPage = ({ onClose }) => {
  return (
    <div className="login-page-container">
      <Loginapp onClose={onClose}/>
    </div>
  );
};

export default LoginPage;