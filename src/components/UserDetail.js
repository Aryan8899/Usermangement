import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Assuming your CSS file is named App.css
import { Spinner } from 'react-bootstrap'; // Importing Bootstrap Spinner

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data from the API
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [id]);

  // If still loading, show the Bootstrap spinner
  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // If user is not found
  if (!user) {
    return <div className="error-message">User not found</div>;
  }

  // Display user details once loaded
  return (
    <div className="container user-details">
      <h1>{user.name}'s Details</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
    </div>
  );
};

export default UserDetail;
