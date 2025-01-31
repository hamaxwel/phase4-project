import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RemindersPage = () => {
    const [reminders, setReminders] = useState([]);
    const [reminderData, setReminderData] = useState({ goal_name: '', reminder_date: '' });
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        if (token) {
            // Fetch all reminders using the correct API endpoint
            axios.get('https://phase4-project-1twb.onrender.com/reminder/all', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setReminders(res.data))
                .catch(err => console.log(err));
        }
    }, [token]);

    const handleReminderSubmit = (e) => {
        e.preventDefault();
        // Post a new reminder using the correct API endpoint
        axios.post('https://phase4-project-1twb.onrender.com/reminder/add', reminderData, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                // Clear form data and re-fetch reminders
                setReminderData({ goal_name: '', reminder_date: '' });
                axios.get('https://phase4-project-1twb.onrender.com/reminder/all', { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => setReminders(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h3>Set Reminder</h3>
            <form onSubmit={handleReminderSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Reminder Goal Name"
                    value={reminderData.goal_name}
                    onChange={(e) => setReminderData({ ...reminderData, goal_name: e.target.value })}
                    required
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    value={reminderData.reminder_date}
                    onChange={(e) => setReminderData({ ...reminderData, reminder_date: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-primary">Set Reminder</button>
            </form>

            <div className="mt-5">
                <h4>Your Reminders</h4>
                <ul className="list-group">
                    {reminders.map((reminder, index) => (
                        <li key={index} className="list-group-item">
                            {reminder.goal_name} | {reminder.reminder_date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RemindersPage;
