# models/saving_goal.py
from app import db

class SavingGoal(db.Model):
    __tablename__ = 'saving_goals'

    goal_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    goal_name = db.Column(db.String(100), nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    current_savings = db.Column(db.Float, default=0.0)
    due_date = db.Column(db.Date)

    user = db.relationship('User', backref=db.backref('saving_goals', lazy=True))

    def __repr__(self):
        return f'<SavingGoal {self.goal_name}, User {self.user_id}>'
