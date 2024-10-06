import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Correct import of useLocation
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import UserDetail from './components/UserDetail';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Drawer, Button } from 'antd';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        alert('Users loaded successfully!');
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
        alert('Failed to load users. Please try again.');
      });
  };

  const handleUserCreated = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers((prevUsers) => [...prevUsers, userWithId]);
    setShowDrawer(false);
    alert('User created successfully!');
  };

  const handleShowDrawer = () => setShowDrawer(true);
  const handleCloseDrawer = () => setShowDrawer(false);

  // Nested component to use useLocation properly inside the Router context
  const AppContent = () => {
    const location = useLocation(); // Now this is correctly used inside the Router context

    return (
      <div>
        {/* Conditionally rendering Create New User button based on current route */}
        {!(location.pathname.includes('/user')) && (
          <Button onClick={handleShowDrawer} type="primary" className="mt-3">
            Create New User
          </Button>
        )}

        <Drawer
          title="Create User"
          placement="right"
          onClose={handleCloseDrawer}
          visible={showDrawer}
          width={500}
        >
          <CreateUser onUserCreated={handleUserCreated} />
        </Drawer>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                users={users}
                setUsers={setUsers}
                loading={loading}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <EditUser
                users={users}
                setUsers={setUsers}
              />
            }
          />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
