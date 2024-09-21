'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4004/api/getuser', {
          withCredentials: true,
        });
        setUsers(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert('Network error: Could not fetch user data.');
        }
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.firstname}?`)) {
      try {
        await axios.delete(`http://localhost:4004/api/user-delete/${user.firstname}`, {
          withCredentials: true,
        });
        alert('User deleted successfully!');
        setUsers(users.filter((u) => u._id !== user._id));
        window.location.reload()
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4004/api/user-logout', {}, { withCredentials: true });
  
      alert('Logged out successfully!');
      router.push('/userLogin'); 
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to logout.');
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await axios.put(`http://localhost:4004/api/user-update/${currentUser.firstname}`, currentUser, {
        withCredentials: true,
      });
      alert('User updated successfully!');
      handleCloseModal();
      const updatedUsers = await axios.get('http://localhost:4004/api/getuser', { withCredentials: true });
      setUsers(Array.isArray(updatedUsers.data) ? updatedUsers.data : [updatedUsers.data]);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };

  return (
    <div style={{ background: '#eeeeee' }}>
      <button type="button" class="btn btn-success" style={{marginLeft:'900px', marginTop:'20px'}} onClick={handleLogout}>Logout</button>
      <div className="d-flex justify-content-center vh-100">
        <div style={{ width: '800px', marginTop: '20px', marginLeft: '80px' }}>
          <table className="table  table-striped-rows">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Location</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id || index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.location}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
          {showModal && (
            <div className="modal fade show" style={{ display: 'block' }} >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit User</h5>
                    <button type="button" className="close" onClick={handleCloseModal}>
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    {currentUser && (
                      <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                          <label htmlFor="firstname" className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            value={currentUser.firstname}
                            onChange={(e) => setCurrentUser({ ...currentUser, firstname: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lastname" className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            value={currentUser.lastname}
                            onChange={(e) => setCurrentUser({ ...currentUser, lastname: e.target.value })}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="location" className="form-label">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            value={currentUser.location}
                            onChange={(e) => setCurrentUser({ ...currentUser, location: e.target.value })}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserTable;
