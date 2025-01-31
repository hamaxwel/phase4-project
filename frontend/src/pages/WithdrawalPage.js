import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WithdrawalPage = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [withdrawalData, setWithdrawalData] = useState({ amount: '', withdrawal_date: '', reason: '' });
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        if (token) {
            // Fetch all withdrawal history using the correct endpoint
            axios.get('https://phase4-project-1twb.onrender.com/withdrawal/all', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setWithdrawals(res.data))
                .catch(err => console.log(err));
        }
    }, [token]);

    const handleWithdrawalSubmit = (e) => {
        e.preventDefault();
        // Post a new withdrawal request to the correct endpoint
        axios.post('https://phase4-project-1twb.onrender.com/withdrawal/add', withdrawalData, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                // Clear the form and re-fetch withdrawals
                setWithdrawalData({ amount: '', withdrawal_date: '', reason: '' });
                axios.get('https://phase4-project-1twb.onrender.com/withdrawal/all', { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => setWithdrawals(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h3>Withdraw Savings</h3>
            <form onSubmit={handleWithdrawalSubmit}>
                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Amount"
                    value={withdrawalData.amount}
                    onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
                    required
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    value={withdrawalData.withdrawal_date}
                    onChange={(e) => setWithdrawalData({ ...withdrawalData, withdrawal_date: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Reason"
                    value={withdrawalData.reason}
                    onChange={(e) => setWithdrawalData({ ...withdrawalData, reason: e.target.value })}
                    required
                />
                <button type="submit" className="btn btn-danger">Withdraw</button>
            </form>

            <div className="mt-5">
                <h4>Withdrawal History</h4>
                <ul className="list-group">
                    {withdrawals.map((withdrawal, index) => (
                        <li key={index} className="list-group-item">
                            {withdrawal.amount} | {withdrawal.withdrawal_date} | {withdrawal.reason}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WithdrawalPage;
