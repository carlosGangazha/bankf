import { useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail, User } from 'lucide-react';
import '../styles/Signup.css'; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Here you would typically handle the signup logic
    // If successful, navigate to the dashboard or login
    // navigate('/dashboard');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create an Account</h1>

        {error && (
          <div className="error-message">
            <AlertCircle size={18} className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <InputField
            id="name"
            label="Full Name"
            type="text"
            value={name}
            onChange={setName}
            icon={<User size={18} className="input-icon" />}
            placeholder="John Doe"
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            icon={<Mail size={18} className="input-icon" />}
            placeholder="you@example.com"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            icon={<Lock size={18} className="input-icon" />}
            placeholder="••••••••"
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            icon={<Lock size={18} className="input-icon" />}
            placeholder="••••••••"
          />
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  icon: JSX.Element;
  placeholder: string;
}> = ({ id, label, type, value, onChange, icon, placeholder }) => (
  <div className="input-field">
    <label htmlFor={id} className="input-label">{label}</label>
    <div className="input-container">
      {icon}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-element"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default Signup;