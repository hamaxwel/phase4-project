# models/reminder.py
from app import db

class Reminder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    goal_name = db.Column(db.String(100), nullable=False)
    reminder_date = db.Column(db.Date, nullable=False)
    
    # Foreign key to link the reminder to a user
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationship to User model
    user = db.relationship('User', backref=db.backref('reminders', lazy=True))

    def __repr__(self):
        return f'<Reminder {self.goal_name} | {self.reminder_date}>'
