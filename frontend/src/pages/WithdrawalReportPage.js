// src/pages/SavingGoalPage.js
import React, { useState } from 'react';

const SavingGoalPage = () => {
  const [goal, setGoal] = useState({ name: '', targetAmount: '', currentSavings: '', dueDate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Savings goal set!");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Set Savings Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Goal Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={goal.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Target Amount</label>
          <input
            type="number"
            className="form-control"
            name="targetAmount"
            value={goal.targetAmount}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Current Savings</label>
          <input
            type="number"
            className="form-control"
            name="currentSavings"
            value={goal.currentSavings}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            name="dueDate"
            value={goal.dueDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Set Goal</button>
      </form>
    </div>
  );
};

export default SavingGoalPage;
