import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  description: string;
  amount: number;
  createdAt: string;
  receiverAccountId: number;
}

const Transactions: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId; 

        fetchTransactions(userId);
      }
    }
  }, [isAuthenticated]);

  const fetchTransactions = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/transactions/history/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Could not load transactions. Please try again later.');
    }
  };

  return (
    <div className="transactions-container">
      <h1>Transactions</h1>
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      {error && <div className="error-message">{error}</div>}
      <ul className="transactions-list">
        {transactions.map((transaction) => (
          <li key={transaction.receiverAccountId} className="transaction-item">
            <div className="transaction-description">
              {transaction.description}
            </div>
            <div className="transaction-date">
              {new Date(transaction.createdAt).toLocaleDateString()}
            </div>
            <div className="transaction-amount" style={{ color: 'red' }}>
              ${transaction.amount.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;