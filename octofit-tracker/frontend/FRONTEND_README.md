# OctoFit Tracker Frontend

A React-based fitness tracking application that connects to the Django REST API backend.

## Features

- **User Management**: View and manage fitness app users
- **Team Management**: Browse and organize fitness teams
- **Activity Tracking**: Log and monitor workout activities
- **Leaderboard**: Competitive rankings based on fitness points
- **Workout Suggestions**: Personalized workout recommendations

## Technology Stack

- React 18+
- React Router DOM (for navigation)
- Bootstrap 5 (for styling)
- Fetch API (for REST API communication)

## Project Structure

```
src/
├── components/
│   ├── Activities.js    # Activity tracking component
│   ├── Leaderboard.js   # Leaderboard rankings
│   ├── Teams.js         # Team management
│   ├── Users.js         # User management
│   └── Workouts.js      # Workout suggestions
├── App.js               # Main app with navigation
├── index.js             # App entry point with routing
└── App.css              # Global styles
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install --prefix octofit-tracker/frontend
```

### 2. Configure Environment

The `.env` file has been automatically created with your codespace name:

```bash
REACT_APP_CODESPACE_NAME=glorious-halibut-5vvpqj5q7gg249wg
```

If you need to update it manually, edit `octofit-tracker/frontend/.env`

### 3. Start the Development Server

```bash
cd octofit-tracker/frontend
npm start
```

The app will open at:
- Local: http://localhost:3000
- Codespace: https://glorious-halibut-5vvpqj5q7gg249wg-3000.app.github.dev

## API Configuration

Each component connects to the Django REST API backend using the following pattern:

```javascript
const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/[endpoint]/`;
```

### API Endpoints

- Users: `/api/users/`
- Teams: `/api/teams/`
- Activities: `/api/activities/`
- Leaderboard: `/api/leaderboard/`
- Workouts: `/api/workouts/`

## Components Overview

### Activities.js
Displays a table of all logged fitness activities with:
- Activity type
- Duration
- Calories burned
- Date

### Leaderboard.js
Shows competitive rankings with:
- User rank
- Team affiliation
- Total points
- Time period

### Teams.js
Displays team cards showing:
- Team name
- Description
- Member count
- Creation date

### Users.js
Shows a table of users with:
- Username
- Email
- Team membership
- Join date

### Workouts.js
Presents workout suggestions as cards with:
- Workout name
- Description
- Difficulty level
- Duration
- Category

## Features

### Navigation
- Responsive Bootstrap navbar
- React Router for client-side routing
- Active link highlighting

### Data Handling
- Automatic loading states
- Error handling with user feedback
- Support for both paginated and plain array API responses
- Console logging for debugging

### Styling
- Bootstrap 5 components
- Custom CSS animations
- Responsive design
- Card hover effects

## Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Console Logging

Each component logs:
1. API endpoint being called
2. HTTP response status
3. Fetched data (raw and processed)
4. Any errors encountered

Check browser console for debugging information.

## Troubleshooting

### API Connection Issues

1. **Verify Backend is Running**
   ```bash
   lsof -i:8000
   ```

2. **Check Environment Variable**
   ```bash
   cat octofit-tracker/frontend/.env
   ```

3. **Verify API Endpoint**
   Open browser console and check logged API URLs

### CORS Issues

Ensure Django CORS settings in `backend/octofit_tracker/settings.py` include:
```python
CORS_ALLOWED_ORIGINS = [
    f"https://{os.environ.get('CODESPACE_NAME')}-3000.app.github.dev",
]
```

### Port Issues

Frontend: 3000 (public)
Backend: 8000 (public)
MongoDB: 27017 (private)

## Next Steps

1. **Authentication**: Add user login/registration
2. **Real-time Updates**: Implement WebSocket connections
3. **Data Visualization**: Add charts and graphs
4. **Mobile Optimization**: Enhance responsive design
5. **Offline Support**: Add service workers

## Resources

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
