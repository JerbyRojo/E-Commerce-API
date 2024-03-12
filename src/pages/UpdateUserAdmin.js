import React, { useState } from 'react';

const UpdateUserAsAdmin = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const updateUserAsAdmin = async () => {
    try {
      console.log('Updating user as admin...');

      if (!userId) {
        setMessage('User ID is required.');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/set-as-admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId }), // Send userId in the request body
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Failed to update user as admin');
      }

      const data = await response.json();
      console.log('Data:', data);
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating user as admin.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Update User as Admin</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="userId">User ID:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="userId" 
                  value={userId} 
                  onChange={handleUserIdChange} 
                  placeholder="Enter user ID" 
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={updateUserAsAdmin}>Update User as Admin</button>
              </div>
              {message && <div className="alert alert-info">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserAsAdmin;