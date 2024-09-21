// components/UserProfile.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const userProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = "user-id-from-auth"; 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${userId}`);
        setUser(response.data);
        
        if (response.data.roll === 'admin') {
          const allUsersResponse = await axios.get('http://localhost:4000/api/user');
          setUsers(allUsersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user.roll === 'admin' ? (
        <div>
          <h2>All Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2>Your Profile</h2>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Location: {user.location}</p>
        </div>
      )}
    </div>
  );
};

export default userProfile;
