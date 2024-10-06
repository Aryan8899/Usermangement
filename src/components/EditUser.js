import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ user, onUserUpdated }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user); // Update the form fields when the user changes
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address') || name.includes('company')) {
      const [main, sub] = name.split('.');
      setUpdatedUser({
        ...updatedUser,
        [main]: { ...updatedUser[main], [sub]: value },
      });
    } else {
      setUpdatedUser({ ...updatedUser, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedUser)
      .then((response) => {
        onUserUpdated(response.data); // Pass the updated user to the parent
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        name="name"
        value={updatedUser.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        name="email"
        value={updatedUser.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="phone"
        value={updatedUser.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="address.street"
        value={updatedUser.address.street}
        onChange={handleInputChange}
        placeholder="Street"
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="address.city"
        value={updatedUser.address.city}
        onChange={handleInputChange}
        placeholder="City"
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="company.name"
        value={updatedUser.company.name}
        onChange={handleInputChange}
        className="form-control mb-2"
        placeholder="Company Name"
      />
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  );
};

export default EditUser;
 