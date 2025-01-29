# models/income.py
from app import db

class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    source = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)

    user = db.relationship('User', backref=db.backref('incomes', lazy=True))

    def __repr__(self):
        return f'<Income {self.source}>'
