import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sendmoney.css';

const SendMoney: React.FC = () => {
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState(0.0); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  
  const getUserDataFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); 
      return {
        sender_id: payload.userId, 
        sender_email: payload.sub, 
      };
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = getUserDataFromToken();
    if (!userData) {
      console.error('User data not found');
      return;
    }

    const transactionData = {
      sender_id: userData.sender_id,
      sender_email: userData.sender_email,
      receiver_account: parseInt(account, 10), 
      amount_sent: amount,
    };

    console.log('Sending money with data:', transactionData);

   
    try {
      const response = await fetch('http://localhost:8080/transactions/send/money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        console.log('Transaction successful');
        navigate('/dashboard'); 
      } else {
        console.error('Transaction failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <div className="send-money-container">
      <div className="send-money-form">
        <h2 className="form-title">Send Money</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="account">
              Account to Send To
            </label>
            <input
              type="text"
              id="account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="form-input"
              required
              min="0.01" 
              step="0.01" 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              rows={4}
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)} 
              className="btn btn-back"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-send"
            >
              Send Money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;