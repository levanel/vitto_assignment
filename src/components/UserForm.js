import React, { useState } from 'react';
import './PopupForm.css';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    age: '',
    gender: '',
    language: '',
    businessType: '',
    loanType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.error('onSubmit function is not provided');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Enter Your Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Age Range:</label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          >
            <option value="">Select Age</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46+">46+</option>
          </select>

          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Language Preference:</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          />

          <label>Type of Business/Startup:</label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          />

          <label>Type of Loan Needed:</label>
          <input
            type="text"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
