import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavingGoalPage = () => {
    const [goals, setGoals] = useState([]);
    const [goalData, setGoalData] = useState({ goal_name: '', target_amount: '', due_date: '' });
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        if (token) {
            // Fetch all saving goals using the correct endpoint
            axios.get('https://phase4-project-1twb.onrender.com/saving_goal/all', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setGoals(res.data))
                .catch(err => console.log(err));
        }
    }, [token]);

    const handleGoalSubmit = (e) => {
        e.preventDefault();
        // Send new saving goal to the backend using the correct endpoint
        axios.post('https://phase4-project-1twb.onrender.com/saving_goal/add', goalData, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                // Clear the form and re-fetch goals
                setGoalData({ goal_name: '', target_amount: '', due_date: '' });
                axios.get('https://phase4-project-1twb.onrender.com/saving_goal/all', { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => setGoals(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h3>Savings Goals</h3>
            <form onSubmit={handleGoalSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Goal Name"
                    value={goalData.goal_name}
                    onChange={(e) => setGoalData({ ...goalData, goal_name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Target Amount"
                    value={goalData.target_amount}
                    onChange={(e) => setGoalData({ ...goalData, target_amount: e.target.value })}
                    required
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    value={goalData.due_date}
                    onChange={(e) => setGoalData({ ...goalData, due_date: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-primary">Add Saving Goal</button>
            </form>
            <div className="mt-5">
                <h4>Your Saving Goals</h4>
                <ul className="list-group">
                    {goals.map((goal, index) => (
                        <li key={index} className="list-group-item">
                            {goal.goal_name} | {goal.target_amount} | {goal.due_date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );   
};

export default SavingGoalPage;
