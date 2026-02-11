import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    console.log('Users Component - Fetching from API endpoint:', API_URL);
    
    fetch(API_URL)
      .then(response => {
        console.log('Users Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users Component - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Users Component - Processed users:', usersData);
        
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users Component - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error loading users: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-6">👤 Users</h1>
        <div>
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-search"></i> Search
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add User
          </button>
        </div>
      </div>
      
      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle"></i> No users found.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Team</th>
                    <th scope="col">Joined</th>
                    <th scope="col" className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="text-center">
                        <span className="badge bg-secondary">{user.id}</span>
                      </td>
                      <td>
                        <strong>{user.name}</strong>
                      </td>
                      <td>
                        {user.username}
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                      <td>
                        {user.team ? (
                          <span className="badge bg-info text-dark">{user.team}</span>
                        ) : (
                          <span className="badge bg-secondary">No team</span>
                        )}
                      </td>
                      <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleShowDetails(user)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <div className="text-center mb-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                  {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <h4 className="mt-3">{selectedUser.name}</h4>
                {selectedUser.username && <p className="text-muted">@{selectedUser.username}</p>}
              </div>
              <div className="mb-3">
                <h6 className="text-muted">Username</h6>
                <p>{selectedUser.username || 'N/A'}</p>
              </div>
              <div className="mb-3">
                <h6 className="text-muted">Email</h6>
                <p>
                  <a href={`mailto:${selectedUser.email}`} className="text-decoration-none">
                    {selectedUser.email}
                  </a>
                </p>
              </div>
              <div className="mb-3">
                <h6 className="text-muted">Team</h6>
                <p>
                  {selectedUser.team ? (
                    <span className="badge bg-info text-dark fs-6">{selectedUser.team}</span>
                  ) : (
                    <span className="text-muted">Not assigned to any team</span>
                  )}
                </p>
              </div>
              <div className="mb-3">
                <h6 className="text-muted">Member Since</h6>
                <p>{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : 'N/A'}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
