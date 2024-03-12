import React, { useState } from 'react';

const UpdateProfile = ({ onUpdateProfile }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          mobileNo: mobileNo
        })
      });
      if (response.ok) {
        setMessage('Profile Updated');
        onUpdateProfile(); // Call the onUpdateProfile function passed from the Profile component
        setFirstName('');
        setLastName('');
        setMobileNo('');
      } else {
        setMessage('Error updating profile');
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      setMessage('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };
  return (
    <div className="p-3">
      <h2>Update Profile</h2>
      <div className="form-group mt-3">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="mobileNo">Mobile No:</label>
        <input
          type="text"
          className="form-control"
          id="mobileNo"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleUpdateProfile}>
        Update Profile
      </button>
      {message && <div className="mt-3 alert alert-success">{message}</div>}
    </div>
  );
};

export default UpdateProfile;