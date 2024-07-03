import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bin from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';
import AppLayout from '../../components/applayout';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteConfirm = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUsers(userId);
    }
  };

  const deleteUsers = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Filter out the deleted user from the state
      setUsers(users.filter((user) => user._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <AppLayout>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2>User List</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>
                      {user.image ? (
                        <img src={`http://localhost:5000/${user.image}`} alt={user.name} className="img-thumbnail" style={{ width: '50px' }} />
                      ) : (
                        'No image available'
                      )}
                    </td>
                    <td>
                      <button  onClick={() => deleteConfirm(user._id)}>
                        <img src={bin} alt="Delete" style={{ width: '20px', marginRight: '5px' }} />
                   
                      </button>
                      <Link to={`/userlist/edit/${user._id}`} >
                        <img src={editIcon} alt="Edit" style={{ width: '20px', marginRight: '5px' }} />

                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p>Loading...</p>}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UserList;
