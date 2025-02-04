"""empty message

Revision ID: 195e060780d8
Revises: 
Create Date: 2025-01-28 18:56:58.193028

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '195e060780d8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('expenses',
    sa.Column('expense_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('expense_id')
    )
    op.create_table('income',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('source', sa.String(length=100), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('saving_goals',
    sa.Column('goal_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('goal_name', sa.String(length=100), nullable=False),
    sa.Column('target_amount', sa.Float(), nullable=False),
    sa.Column('current_savings', sa.Float(), nullable=True),
    sa.Column('due_date', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('goal_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('saving_goals')
    op.drop_table('income')
    op.drop_table('expenses')
    op.drop_table('user')
    # ### end Alembic commands ###
