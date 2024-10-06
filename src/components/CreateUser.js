
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ onUserCreated }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address') || name.includes('company')) {
      const [main, sub] = name.split('.');
      setUser({
        ...user,
        [main]: { ...user[main], [sub]: value },
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://jsonplaceholder.typicode.com/users', user)
      .then((response) => {
        onUserCreated(response.data);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
        className="form-control mb-2"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
        className="form-control mb-2"
      />
      <input
        type="text"
        name="phone"
        value={user.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        required
        className="form-control mb-2"
      />
      <input
        type="text"
        name="address.street"
        value={user.address.street}
        onChange={handleInputChange}
        placeholder="Street"
        required
        className="form-control mb-2"
      />
      <input
        type="text"
        name="address.city"
        value={user.address.city}
        onChange={handleInputChange}
        placeholder="City"
        required
        className="form-control mb-2"
      />
      <input
        type="text"
        name="company.name"
        value={user.company.name}
        onChange={handleInputChange}
        placeholder="Company Name"
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-primary">
        Create User
      </button>
    </form>
  );
};

export default CreateUser;
