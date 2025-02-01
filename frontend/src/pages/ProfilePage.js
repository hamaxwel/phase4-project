import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        if (token) {
            axios.get('https://phase4-project-1twb.onrender.com/profile', { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setProfile(res.data))
                .catch(err => console.log(err));
        }
    }, [token]);

    return (
        <div className="container mt-5">
            <h3>Profile Page</h3>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{profile.full_name}</h5>
                    <p className="card-text">Email: {profile.email}</p>
                    <p className="card-text">Phone Number: {profile.phone_number}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
