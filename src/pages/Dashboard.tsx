import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css'; // Import the CSS file

interface User {
  name: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setTimeout(() => {
          setUser({ name: 'Miller' });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back, {user?.name}</h1>
        <p className="welcome-subtitle">Here's an overview of your finances</p>
      </div>

      {/* Accounts section */}
      <div className="account-section">
        <h2 className="section-title">Your Accounts</h2>
        <div className="account-cards">
          <div className="account-card">
            <p className="account-label">Savings Account</p>
            <p className="account-balance">$2,450.25</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-grid">
          <Link to="/send-money" className="action-card">
            <div className="action-icon">
              <DollarSign size={20} className="icon" />
            </div>
            <span className="action-label">Bank Transfer</span>
          </Link>
          <button className="action-card">
            <div className="action-icon">
              <CreditCard size={20} className="icon" />
            </div>
            <span className="action-label">Pay Bill</span>
          </button>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h2 className="section-title">Recent Transactions</h2>
          <Link to="/transactions" className="view-all">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="transactions-list">
          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon">
                <CreditCard size={18} className="icon" />
              </div>
              <div>
                <p className="transaction-title">Starbucks</p>
                <p className="transaction-date">May 8, 2025</p>
              </div>
            </div>
            <span className="transaction-amount negative">-$4.80</span>
          </div>

          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon">
                <DollarSign size={18} className="icon" />
              </div>
              <div>
                <p className="transaction-title">Salary Deposit</p>
                <p className="transaction-date">May 5, 2025</p>
              </div>
            </div>
            <span className="transaction-amount positive">+$2,450.00</span>
          </div>

          <div className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon">
                <CreditCard size={18} className="icon" />
              </div>
              <div>
                <p className="transaction-title">Amazon</p>
                <p className="transaction-date">May 3, 2025</p>
              </div>
            </div>
            <span className="transaction-amount negative">-$28.50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;