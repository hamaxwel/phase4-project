// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import IncomeExpensePage from './pages/IncomeExpensePage';
import SavingGoalPage from './pages/SavingGoalPage';
import WithdrawalReportPage from './pages/WithdrawalReportPage';
import RemindersPage from './pages/RemindersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';  // Import DashboardPage

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/income-expense" element={<IncomeExpensePage />} />
          <Route path="/goal" element={<SavingGoalPage />} />
          <Route path="/withdraw-reports" element={<WithdrawalReportPage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* Added Dashboard Route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
