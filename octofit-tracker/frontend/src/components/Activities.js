import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const handleShowDetails = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  useEffect(() => {
    console.log('Activities Component - Fetching from API endpoint:', API_URL);
    
    fetch(API_URL)
      .then(response => {
        console.log('Activities Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities Component - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities Component - Processed activities:', activitiesData);
        
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Activities Component - Error fetching data:', error);
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
          Error loading activities: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-6">🏃 Activities</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Log Activity
        </button>
      </div>
      
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle"></i> No activities found.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col" className="text-center">Duration</th>
                    <th scope="col" className="text-center">Calories</th>
                    <th scope="col">Date</th>
                    <th scope="col" className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map(activity => (
                    <tr key={activity.id}>
                      <td className="text-center">
                        <span className="badge bg-secondary">{activity.id}</span>
                      </td>
                      <td><strong>{activity.user}</strong></td>
                      <td>
                        <span className="badge bg-info text-dark">{activity.activity_type}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-warning text-dark">{activity.duration} min</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-danger">{activity.calories_burned} cal</span>
                      </td>
                      <td>
                        {activity.date && !isNaN(new Date(activity.date)) 
                          ? new Date(activity.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : 'N/A'}
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleShowDetails(activity)}
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

      {/* Activity Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Activity Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <div>
              <div className="mb-3">
                <h6 className="text-muted">User</h6>
                <p className="h5">{selectedActivity.user}</p>
              </div>
              <div className="mb-3">
                <h6 className="text-muted">Activity Type</h6>
                <p><span className="badge bg-info text-dark">{selectedActivity.activity_type}</span></p>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <h6 className="text-muted">Duration</h6>
                  <p className="h5">{selectedActivity.duration} min</p>
                </div>
                <div className="col-6">
                  <h6 className="text-muted">Calories Burned</h6>
                  <p className="h5">{selectedActivity.calories_burned} cal</p>
                </div>
              </div>
              <div className="mb-3">
                <h6 className="text-muted">Date</h6>
                <p>
                  {selectedActivity.date && !isNaN(new Date(selectedActivity.date))
                    ? new Date(selectedActivity.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'N/A'}
                </p>
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

export default Activities;
