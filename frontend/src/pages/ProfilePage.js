// src/pages/ProfilePage.js
import React, { useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    phone: "123456789",
    email: "john@example.com"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Profile</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
