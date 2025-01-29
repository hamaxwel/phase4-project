# models/expense.py
from app import db

class Expense(db.Model):
    __tablename__ = 'expenses'

    expense_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)
    category = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', backref=db.backref('expenses', lazy=True))

    def __repr__(self):
        return f'<Expense {self.amount}, Category {self.category}>'
