// src/pages/IncomeExpensePage.js
import React, { useState } from 'react';

const IncomeExpensePage = () => {
  const [income, setIncome] = useState({ amount: '', date: '', source: '' });
  const [expense, setExpense] = useState({ amount: '', date: '', category: '' });

  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
  };

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    alert("Income added!");
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    alert("Expense added!");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Track Income & Expenses</h2>

      <h3>Add Income</h3>
      <form onSubmit={handleIncomeSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={income.amount}
            onChange={handleIncomeChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={income.date}
            onChange={handleIncomeChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Source</label>
          <input
            type="text"
            className="form-control"
            name="source"
            value={income.source}
            onChange={handleIncomeChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Income</button>
      </form>

      <hr />

      <h3>Add Expense</h3>
      <form onSubmit={handleExpenseSubmit}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={expense.amount}
            onChange={handleExpenseChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={expense.date}
            onChange={handleExpenseChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={expense.category}
            onChange={handleExpenseChange}
          />
        </div>
        <button type="submit" className="btn btn-danger">Add Expense</button>
      </form>
    </div>
  );
};

export default IncomeExpensePage;
