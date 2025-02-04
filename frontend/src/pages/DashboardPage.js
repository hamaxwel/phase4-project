import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [profile, setProfile] = useState(null);
    const [income, setIncome] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [savings, setSavings] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [isEditing, setIsEditing] = useState(false); // To track if the user is editing
    const [editProfile, setEditProfile] = useState({ full_name: '', email: '', phone_number: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // Fetch user profile
            axios.get('https://phase4-project-1twb.onrender.com/profile', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setProfile(res.data);
                    setEditProfile({ full_name: res.data.full_name, email: res.data.email, phone_number: res.data.phone_number });
                })
                .catch(err => console.log(err));

            // Fetch user financial data (income, expenses, savings)
            axios.get('https://phase4-project-1twb.onrender.com/financial/overview', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setIncome(res.data.total_income);
                    setExpenses(res.data.total_expenses);
                    setSavings(res.data.total_savings);
                })
                .catch(err => console.log(err));
        }
    }, [token]);

    const handleLogout = () => {
        // Remove the token from localStorage and redirect to login
        localStorage.removeItem('access_token');
        setToken(null);  // Update the token state
        navigate('/login');  // Redirect to the login page
    };

    const handleAddIncomeExpense = () => {
        navigate('/income-expense');  // Navigate to income/expenses page
    };

    const handleSetSavingsGoal = () => {
        navigate('/saving-goal');  // Navigate to saving goals page
    };

    const handleWithdrawSavings = () => {
        navigate('/withdraw');  // Navigate to withdrawal page
    };

    const handleSetReminder = () => {
        navigate('/reminders');  // Navigate to set reminder page
    };

    const handleDeleteAccount = () => {
        // Ask the user for confirmation
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

        if (confirmDelete) {
            // Make DELETE request to the backend to delete the user's account
            axios.delete('https://phase4-project-1twb.onrender.com/user/delete', { 
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => {
                alert('Account deleted successfully');
                // Remove token from localStorage and redirect to login page
                localStorage.removeItem('access_token');
                setToken(null);
                navigate('/login');
            })
            .catch(err => {
                console.error('Error deleting account:', err);
                alert('There was an issue deleting your account.');
            });
        } else {
            console.log('Account deletion canceled.');
        }
    };

    const handleEditProfile = () => {
        setIsEditing(true);  // Enable editing mode
    };

    const handleCancelEdit = () => {
        setIsEditing(false);  // Cancel editing mode and revert changes
        setEditProfile({ full_name: profile.full_name, email: profile.email, phone_number: profile.phone_number });
    };

    const handleSaveProfile = () => {
        // Make PUT request to update the user profile
        axios.put('https://phase4-project-1twb.onrender.com/user/update', editProfile, { 
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setProfile(res.data);  // Update profile with the new data
            setIsEditing(false);  // Disable editing mode
            alert('Profile updated successfully');
        })
        .catch(err => {
            console.error('Error updating profile:', err);
            alert('There was an issue updating your profile.');
        });
    };

    // If any data is still loading, display loading message
    if (!profile || income === null || expenses === null || savings === null) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">User Dashboard</h3>

            <div className="row">
                {/* Profile Card */}
                <div className="col-md-4 mb-4 mb-md-0">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center">
                                <img 
                                    src="https://www.w3schools.com/w3images/avatar2.png" 
                                    alt=""  // Empty alt for purely decorative images
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                />

                                <h5 className="card-title text-center">{profile.full_name}</h5>
                            </div>
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        value={editProfile.full_name}
                                        onChange={(e) => setEditProfile({ ...editProfile, full_name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        className="form-control mb-2"
                                        value={editProfile.email}
                                        onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        value={editProfile.phone_number}
                                        onChange={(e) => setEditProfile({ ...editProfile, phone_number: e.target.value })}
                                    />
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-success" onClick={handleSaveProfile}>Save</button>
                                        <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="card-text"><strong>Email:</strong> {profile.email}</p>
                                    <p className="card-text"><strong>Phone Number:</strong> {profile.phone_number}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-warning" onClick={handleEditProfile}>Edit Profile</button>
                                        <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Financial Overview Card */}
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h5 className="card-title">Financial Overview</h5>
                        </div>
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Income</h6>
                            <p className="card-text">Total Income: <strong>${income}</strong></p>
                            <h6 className="card-subtitle mb-2 text-muted">Expenses</h6>
                            <p className="card-text">Total Expenses: <strong>${expenses}</strong></p>
                            <h6 className="card-subtitle mb-2 text-muted">Savings</h6>
                            <p className="card-text">Total Savings: <strong>${savings}</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Card */}
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h5 className="card-title">Quick Actions</h5>
                        </div>
                        <div className="card-body d-flex flex-column flex-md-row justify-content-around">
                            {/* Add Income/Expense Button */}
                            <button className="btn btn-secondary mb-3 mb-md-0" onClick={handleAddIncomeExpense}>Add Income/Expense</button>

                            {/* Set Savings Goal Button */}
                            <button className="btn btn-success mb-3 mb-md-0" onClick={handleSetSavingsGoal}>Set Savings Goal</button>

                            {/* Withdraw Savings Button */}
                            <button className="btn btn-danger mb-3 mb-md-0" onClick={handleWithdrawSavings}>Withdraw Savings</button>

                            {/* Set Reminder Button */}
                            <button className="btn btn-primary mb-3 mb-md-0" onClick={handleSetReminder}>Set Reminder</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default DashboardPage;
