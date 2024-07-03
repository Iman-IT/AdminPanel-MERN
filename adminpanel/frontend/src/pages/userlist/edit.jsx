import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppLayout from '../../components/applayout';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Import and use useNavigate instead of useHistory

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const onFinish = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const form = event.target;
      const formData = new FormData(form);
      const updatedUser = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
      };

      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
      console.log('User updated successfully:', response.data);

      // Redirect to user list after successful update
      navigate('/userlist');
    } catch (error) {
      console.error('Error updating user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>User not found</p>;
  }

  return (
    <AppLayout>
      <div className="container">
        <h2>Edit User</h2>
        <form onSubmit={onFinish}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" defaultValue={userData.name} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" defaultValue={userData.email} required />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone" name="phone" defaultValue={userData.phone} required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea className="form-control" id="address" name="address" defaultValue={userData.address} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Update
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Edit;
