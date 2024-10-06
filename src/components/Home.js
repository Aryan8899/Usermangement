import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Button } from "@mui/material";
import Spinner from "./Spinner";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";

const Home = ({ users, setUsers, loading }) => {
  const [showCreateDrawer, setShowCreateDrawer] = useState(false); // Create Drawer state
  const [showEditDrawer, setShowEditDrawer] = useState(false); // Edit Drawer state
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user

  const handleCreateDrawerOpen = () => setShowCreateDrawer(true);
  const handleCreateDrawerClose = () => setShowCreateDrawer(false);

  const handleEditDrawerOpen = (user) => {
    setSelectedUser(user);
    setShowEditDrawer(true);
  };
  const handleEditDrawerClose = () => setShowEditDrawer(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id)); // Remove user from list
    }
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    handleEditDrawerClose(); // Close the drawer after updating
  };

  if (loading) {
    return <Spinner />; // Show spinner while loading
  }

  return (
    <div className="container">
      <h1>User List</h1>

      {/* Button to open Create User Drawer */}

      {/* Create User Drawer */}
      <Drawer
        anchor="right"
        open={showCreateDrawer}
        onClose={handleCreateDrawerClose}
      >
        <div style={{ width: "400px", padding: "20px" }}>
          <h2>Create User</h2>
          <CreateUser
            onUserCreated={(newUser) => {
              setUsers([...users, newUser]); // Add the new user to the list
              handleCreateDrawerClose(); // Close the drawer after user creation
            }}
          />
        </div>
      </Drawer>

      {/* Edit User Drawer */}
      {selectedUser && (
        <Drawer
          anchor="right"
          open={showEditDrawer}
          onClose={handleEditDrawerClose}
        >
          <div style={{ width: "400px", padding: "20px" }}>
            <h2>Edit User</h2>
            <EditUser user={selectedUser} onUserUpdated={handleUserUpdated} />
          </div>
        </Drawer>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/user/${user.id}`}>View</Link>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditDrawerOpen(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
