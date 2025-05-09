import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import SendMoney from './pages/Sendmoney';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './Auth//ProtectedRoutes'; // Ensure this is implemented

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
          <Route path="/send-money" element={<ProtectedRoute element={<SendMoney />} />} />
          {/* Other routes can be added here */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;