import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail } from 'lucide-react';
import '../styles/Login.css';
import { useAuth } from '../Auth/AuthContext';

interface AuthResponse {
  token: string;
}

interface ErrorResponse {
  message: string;
}

const Login: React.FC = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }
  
      const data: AuthResponse = await response.json();
      localStorage.setItem('token', data.token);
      
      console.log('Token saved:', data.token);
      await fetchBalance(data.token);
      
      login(data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const fetchBalance = async (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const { userId, sub: email } = payload;

      const response = await fetch('http://localhost:8080/transactions/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
  
      const balanceData = await response.json();
      localStorage.setItem('balance', balanceData.balance);
      console.log('Balance fetched:', balanceData.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-content">
          <div className="login-header">
            <h1>Welcome Back</h1>
          </div>
          
          {error && (
            <div className="error-message">
              <AlertCircle size={18} className="error-icon" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <div className="input-icon">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <div className="input-icon">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <div className="remember-me">
                <input id="remember" type="checkbox" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="#" className="forgot-password">Forgot password?</Link>
            </div>
            
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          
          <div className="signup-link">
            <p>
              Don't have an account?{' '}
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;