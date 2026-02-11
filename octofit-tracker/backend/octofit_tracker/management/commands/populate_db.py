from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Clearing existing data...')
        
        # Delete all existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('✓ Cleared existing data'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='The mightiest heroes of the Marvel Universe',
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='The legendary heroes of the DC Universe',
        )
        self.stdout.write(self.style.SUCCESS('✓ Created teams'))
        
        # Create Users
        self.stdout.write('Creating users...')
        marvel_users = [
            User.objects.create(
                name='Spider-Man',
                email='spiderman@marvel.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_marvel._id),
            ),
            User.objects.create(
                name='Iron Man',
                email='ironman@marvel.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_marvel._id),
            ),
            User.objects.create(
                name='Captain America',
                email='captainamerica@marvel.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_marvel._id),
            ),
            User.objects.create(
                name='Black Widow',
                email='blackwidow@marvel.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_marvel._id),
            ),
            User.objects.create(
                name='Thor',
                email='thor@marvel.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_marvel._id),
            ),
        ]
        
        dc_users = [
            User.objects.create(
                name='Batman',
                email='batman@dc.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_dc._id),
            ),
            User.objects.create(
                name='Superman',
                email='superman@dc.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_dc._id),
            ),
            User.objects.create(
                name='Wonder Woman',
                email='wonderwoman@dc.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_dc._id),
            ),
            User.objects.create(
                name='Flash',
                email='flash@dc.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_dc._id),
            ),
            User.objects.create(
                name='Aquaman',
                email='aquaman@dc.com',
                password='pbkdf2_sha256$390000$test',
                team_id=str(team_dc._id),
            ),
        ]
        
        all_users = marvel_users + dc_users
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(all_users)} users'))
        
        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Swimming', 'Cycling', 'Weight Training', 'Yoga', 'Boxing']
        activities_created = 0
        
        for user in all_users:
            for i in range(5):
                activity_type = activity_types[i % len(activity_types)]
                duration = 30 + (i * 10)
                calories = duration * 8
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_type,
                    duration=duration,
                    calories_burned=calories,
                    date=timezone.now() - timedelta(days=i),
                    notes=f'{user.name}\'s {activity_type.lower()} session',
                )
                activities_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {activities_created} activities'))
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        leaderboard_data = []
        
        for user in all_users:
            user_activities = Activity.objects.filter(user_id=str(user._id))
            total_activities = user_activities.count()
            total_calories = sum([a.calories_burned for a in user_activities])
            total_duration = sum([a.duration for a in user_activities])
            
            leaderboard_data.append({
                'user': user,
                'total_activities': total_activities,
                'total_calories': total_calories,
                'total_duration': total_duration,
            })
        
        # Sort by total calories to assign ranks
        leaderboard_data.sort(key=lambda x: x['total_calories'], reverse=True)
        
        for rank, data in enumerate(leaderboard_data, start=1):
            Leaderboard.objects.create(
                user_id=str(data['user']._id),
                team_id=data['user'].team_id,
                total_activities=data['total_activities'],
                total_calories=data['total_calories'],
                total_duration=data['total_duration'],
                rank=rank,
            )
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(leaderboard_data)} leaderboard entries'))
        
        # Create Workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            Workout.objects.create(
                name='Spider Strength Circuit',
                description='Build strength and agility like Spider-Man with bodyweight exercises',
                activity_type='Weight Training',
                difficulty='Intermediate',
                duration=45,
                calories_estimate=400,
            ),
            Workout.objects.create(
                name='Flash Speed Training',
                description='High-intensity interval training to boost speed and endurance',
                activity_type='Running',
                difficulty='Advanced',
                duration=30,
                calories_estimate=500,
            ),
            Workout.objects.create(
                name='Aquaman Swim Challenge',
                description='Master the water with this comprehensive swimming workout',
                activity_type='Swimming',
                difficulty='Intermediate',
                duration=60,
                calories_estimate=600,
            ),
            Workout.objects.create(
                name='Captain America Endurance',
                description='Build superhero stamina with long-distance running',
                activity_type='Running',
                difficulty='Beginner',
                duration=40,
                calories_estimate=350,
            ),
            Workout.objects.create(
                name='Black Widow Combat Training',
                description='Martial arts inspired boxing and combat conditioning',
                activity_type='Boxing',
                difficulty='Advanced',
                duration=50,
                calories_estimate=550,
            ),
            Workout.objects.create(
                name='Wonder Woman Warrior Flow',
                description='Strength and flexibility yoga routine for warriors',
                activity_type='Yoga',
                difficulty='Beginner',
                duration=35,
                calories_estimate=250,
            ),
            Workout.objects.create(
                name='Batman Night Patrol Cycling',
                description='Long-distance cycling for vigilante-level endurance',
                activity_type='Cycling',
                difficulty='Intermediate',
                duration=90,
                calories_estimate=700,
            ),
            Workout.objects.create(
                name='Thor Thunder Power Lift',
                description='Heavy weight training to build godlike strength',
                activity_type='Weight Training',
                difficulty='Advanced',
                duration=60,
                calories_estimate=450,
            ),
        ]
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(workouts)} workouts'))
        
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard Entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
