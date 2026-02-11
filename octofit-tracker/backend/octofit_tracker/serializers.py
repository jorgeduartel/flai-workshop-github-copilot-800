from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout
from bson import ObjectId


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    username = serializers.CharField(source='name', read_only=True)
    team = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'password', 'team_id', 'team', 'created_at']
        extra_kwargs = {'password': {'write_only': True}}

    def get_id(self, obj):
        return str(obj._id)
    
    def get_team(self, obj):
        if obj.team_id:
            try:
                # Convert string ID to ObjectId for lookup
                team = Team.objects.get(_id=ObjectId(obj.team_id))
                return team.name
            except (Team.DoesNotExist, Exception):
                return None
        return None


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_at', 'member_count']

    def get_id(self, obj):
        return str(obj._id)
    
    def get_member_count(self, obj):
        return User.objects.filter(team_id=str(obj._id)).count()


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ['id', 'user_id', 'user', 'activity_type', 'duration', 'calories_burned', 'date', 'notes']

    def get_id(self, obj):
        return str(obj._id)
    
    def get_user(self, obj):
        if obj.user_id:
            try:
                # Convert string ID to ObjectId for lookup
                user = User.objects.get(_id=ObjectId(obj.user_id))
                return user.name
            except (User.DoesNotExist, Exception):
                return "Unknown User"
        return "Unknown User"


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    total_points = serializers.SerializerMethodField()
    period = serializers.SerializerMethodField()

    class Meta:
        model = Leaderboard
        fields = ['id', 'user_id', 'user', 'team_id', 'team', 'total_activities', 'total_calories', 'total_duration', 'total_points', 'rank', 'period', 'updated_at']

    def get_id(self, obj):
        return str(obj._id)
    
    def get_user(self, obj):
        if obj.user_id:
            try:
                # Convert string ID to ObjectId for lookup
                user = User.objects.get(_id=ObjectId(obj.user_id))
                return user.name
            except (User.DoesNotExist, Exception):
                return "Unknown User"
        return "Unknown User"
    
    def get_team(self, obj):
        if obj.team_id:
            try:
                # Convert string ID to ObjectId for lookup
                team = Team.objects.get(_id=ObjectId(obj.team_id))
                return team.name
            except (Team.DoesNotExist, Exception):
                return None
        return None
    
    def get_total_points(self, obj):
        # Calculate points: activities * 10 + calories / 10
        return (obj.total_activities * 10) + (obj.total_calories // 10)
    
    def get_period(self, obj):
        return "Monthly"


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    category = serializers.CharField(source='activity_type', read_only=True)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'activity_type', 'category', 'difficulty', 'duration', 'calories_estimate']

    def get_id(self, obj):
        return str(obj._id)
