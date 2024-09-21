'use client'; 
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 

export default function UpdateUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
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
      const response = await axios.post('http://localhost:4004/api/userRegister', formData);  
      console.log('Response:', response.data); 
      alert(`Submitted: ${formData.firstName} ${formData.lastName}, ${formData.location}, ${formData.roll}`);
      router.push('/userTable');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to submit the form. Please try again.'); 
    }
  };

  return (
    <div style={{background:"#79c2d0"}}>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ width: "400px", marginTop: '10px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="roll" className="form-label">Role</label> {/* Updated label */}
            <input
              type="text"
              className="form-control"
              id="roll"
              name="roll"
              placeholder="Enter role"
              value={formData.roll}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <select
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select location</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Noida">Noida</option>
              <option value="Delhi">Delhi</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Mohali">Mohali</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
}

