# models/withdrawal.py
from app import db
from datetime import datetime

class Withdrawal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Foreign key to User
    amount = db.Column(db.Float, nullable=False)
    withdrawal_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    reason = db.Column(db.String(255), nullable=True)

    # Relationship with User (for easy access to user details)
    user = db.relationship('User', backref=db.backref('withdrawals', lazy=True))

    def __repr__(self):
        return f'<Withdrawal {self.amount} for User {self.user_id} on {self.withdrawal_date}>'
