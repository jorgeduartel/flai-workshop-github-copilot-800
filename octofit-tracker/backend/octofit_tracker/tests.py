from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="Test User",
            email="test@example.com",
            password="testpass123"
        )

    def test_user_creation(self):
        self.assertIsNotNone(self.user._id)
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.email, "test@example.com")


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            description="A test team"
        )

    def test_team_creation(self):
        self.assertIsNotNone(self.team._id)
        self.assertEqual(self.team.name, "Test Team")


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id="123456789012345678901234",
            activity_type="Running",
            duration=30,
            calories_burned=300,
            date=datetime.now()
        )

    def test_activity_creation(self):
        self.assertIsNotNone(self.activity._id)
        self.assertEqual(self.activity.activity_type, "Running")
        self.assertEqual(self.activity.duration, 30)


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_id="123456789012345678901234",
            team_id="123456789012345678901234",
            total_activities=10,
            total_calories=1000,
            total_duration=300,
            rank=1
        )

    def test_leaderboard_creation(self):
        self.assertIsNotNone(self.leaderboard._id)
        self.assertEqual(self.leaderboard.rank, 1)
        self.assertEqual(self.leaderboard.total_activities, 10)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name="Morning Run",
            description="A refreshing morning run",
            activity_type="Running",
            difficulty="Medium",
            duration=30,
            calories_estimate=300
        )

    def test_workout_creation(self):
        self.assertIsNotNone(self.workout._id)
        self.assertEqual(self.workout.name, "Morning Run")
        self.assertEqual(self.workout.difficulty, "Medium")


class UserAPITest(APITestCase):
    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {
            'name': 'API User',
            'email': 'api@example.com',
            'password': 'apipass123'
        }
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITest(APITestCase):
    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {
            'name': 'API Team',
            'description': 'Team created via API'
        }
        response = self.client.post('/api/teams/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITest(APITestCase):
    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {
            'name': 'Test Workout',
            'description': 'A test workout',
            'activity_type': 'Running',
            'difficulty': 'Easy',
            'duration': 20,
            'calories_estimate': 200
        }
        response = self.client.post('/api/workouts/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
