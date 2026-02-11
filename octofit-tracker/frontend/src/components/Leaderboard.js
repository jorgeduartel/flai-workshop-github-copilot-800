import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard Component - Fetching from API endpoint:', API_URL);
    
    fetch(API_URL)
      .then(response => {
        console.log('Leaderboard Component - Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard Component - Fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard Component - Processed leaderboard:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard Component - Error fetching data:', error);
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
          Error loading leaderboard: {error}
        </div>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="badge bg-warning text-dark fs-6">🥇 {rank}</span>;
    if (rank === 2) return <span className="badge bg-secondary fs-6">🥈 {rank}</span>;
    if (rank === 3) return <span className="badge bg-danger fs-6">🥉 {rank}</span>;
    return <span className="badge bg-primary fs-6">{rank}</span>;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-6">🏆 Leaderboard</h1>
        <button className="btn btn-outline-primary">
          <i className="bi bi-funnel"></i> Filter Period
        </button>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle"></i> No leaderboard data found.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center">Rank</th>
                    <th scope="col">User</th>
                    <th scope="col">Team</th>
                    <th scope="col" className="text-center">Activities</th>
                    <th scope="col" className="text-center">Calories</th>
                    <th scope="col" className="text-center">Duration (min)</th>
                    <th scope="col" className="text-center">Total Points</th>
                    <th scope="col">Period</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id} className={index < 3 ? 'table-active' : ''}>
                      <td className="text-center">
                        {getRankBadge(index + 1)}
                      </td>
                      <td><strong>{entry.user}</strong></td>
                      <td>
                        {entry.team ? (
                          <span className="badge bg-info text-dark">{entry.team}</span>
                        ) : (
                          <span className="text-muted">No Team</span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className="badge bg-primary">{entry.total_activities || 0}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-danger">{entry.total_calories || 0}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-warning text-dark">{entry.total_duration || 0}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge bg-success fs-6">{entry.total_points} pts</span>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{entry.period}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
