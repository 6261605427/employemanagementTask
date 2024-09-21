'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 

export default function UpdateUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '', 
    roll: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  

    console.log('Form Data before submission:', formData); 

    try {
      const response = await axios.post('http://localhost:4004/api/user-login', formData,   { withCredentials: true } );  
    
      console.log('Response:', response.data);  
      alert(`Submitted: ${formData.firstname}, ${formData.roll}`);
      router.push('/userTable');
    } catch (error) {
      console.error('Error submitting the form:', error);

      if (error.response) {
        console.error('Server responded with:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response from server:', error.request);
        alert('Network error: Could not reach the server.');
      } else {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={{background:'#b6cdbd'}}>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ width: "400px", marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname" 
              placeholder="Enter first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="roll" className="form-label">Role</label>
            <select
              className="form-control"
              id="roll"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
       <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
}
