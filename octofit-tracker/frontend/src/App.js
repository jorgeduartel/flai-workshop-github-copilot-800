import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const Home = () => (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded mb-5">
        <h1 className="display-4">Welcome to OctoFit Tracker!</h1>
        <p className="lead">
          Track your fitness activities, compete with teams, and achieve your fitness goals.
        </p>
        <hr className="my-4" />
        <p>
          Use the navigation menu above to explore activities, view the leaderboard, 
          manage teams, browse users, and get personalized workout suggestions.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <Link to="/users" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-1 mb-3">👥</div>
                <h3 className="card-title">Users</h3>
                <p className="card-text text-muted">
                  View and manage user profiles and their fitness journey.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/activities" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-1 mb-3">🏃</div>
                <h3 className="card-title">Activities</h3>
                <p className="card-text text-muted">
                  Track and log your fitness activities and workouts.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/leaderboard" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-1 mb-3">🏆</div>
                <h3 className="card-title">Leaderboard</h3>
                <p className="card-text text-muted">
                  Compete with others and see who's leading the fitness challenge.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Additional Cards */}
      <div className="row g-4">
        <div className="col-md-6">
          <Link to="/teams" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-3 mb-3">🤝</div>
                <h4 className="card-title">Teams</h4>
                <p className="card-text text-muted">
                  Join or create teams and compete together.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/workouts" className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-card">
              <div className="card-body text-center">
                <div className="display-3 mb-3">💪</div>
                <h4 className="card-title">Workouts</h4>
                <p className="card-text text-muted">
                  Get personalized workout suggestions and plans.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>🏃 OctoFit Tracker</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content - Routes */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">© 2026 OctoFit Tracker - Your Fitness Companion</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
