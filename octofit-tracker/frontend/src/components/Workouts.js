import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const handleShowDetails = (workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWorkout(null);
  };

  useEffect(() => {
    console.log('Workouts Component - Fetching from API endpoint:', API_URL);
    
    fetch(API_URL)
      .then(response => {
        console.log('Workouts Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts Component - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts Component - Processed workouts:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts Component - Error fetching data:', error);
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
          Error loading workouts: {error}
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'Easy': 'bg-success',
      'Medium': 'bg-warning text-dark',
      'Hard': 'bg-danger'
    };
    return badges[difficulty] || 'bg-secondary';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-6">💪 Workout Suggestions</h1>
        <button className="btn btn-outline-primary">
          <i className="bi bi-funnel"></i> Filter by Difficulty
        </button>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle"></i> No workout suggestions found.
        </div>
      ) : (
        <div className="row">
          {workouts.map(workout => (
            <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-gradient">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text text-muted flex-grow-1">{workout.description || 'No description available'}</p>
                  <hr />
                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Difficulty:</span>
                      <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                        {workout.difficulty || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Duration:</span>
                      <span className="badge bg-info text-dark">{workout.duration || 'N/A'} min</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Category:</span>
                      <span className="badge bg-secondary">{workout.category || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleShowDetails(workout)}
                    >
                      View Details
                    </button>
                    <button className="btn btn-success btn-sm">
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workout Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{selectedWorkout?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWorkout && (
            <div>
              <div className="mb-3">
                <h6 className="text-muted">Description</h6>
                <p>{selectedWorkout.description || 'No description available'}</p>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <h6 className="text-muted">Difficulty</h6>
                  <p>
                    <span className={`badge ${getDifficultyBadge(selectedWorkout.difficulty)} fs-6`}>
                      {selectedWorkout.difficulty || 'N/A'}
                    </span>
                  </p>
                </div>
                <div className="col-4">
                  <h6 className="text-muted">Duration</h6>
                  <p className="h5">{selectedWorkout.duration || 'N/A'} min</p>
                </div>
                <div className="col-4">
                  <h6 className="text-muted">Category</h6>
                  <p>
                    <span className="badge bg-secondary fs-6">{selectedWorkout.category || 'N/A'}</span>
                  </p>
                </div>
              </div>
              <div className="alert alert-light" role="alert">
                <strong>Tip:</strong> Make sure to warm up before starting this workout and stay hydrated!
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" size="lg">
            Start Workout
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Workouts;
