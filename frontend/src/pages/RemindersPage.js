// src/pages/RemindersPage.js
import React, { useState } from 'react';

const RemindersPage = () => {
  const [reminder, setReminder] = useState({ message: '', date: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder({ ...reminder, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reminder set!");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Set Reminder</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Reminder Message</label>
          <input
            type="text"
            className="form-control"
            name="message"
            value={reminder.message}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={reminder.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-info">Set Reminder</button>
      </form>
    </div>
  );
};

export default RemindersPage;
