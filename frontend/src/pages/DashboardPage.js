// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, ProgressBar } from 'react-bootstrap';

const DashboardPage = () => {
  const [user, setUser] = useState({ name: 'John Doe', profilePicture: '', email: '' });
  const [totalIncome, setTotalIncome] = useState(50000);  // Example income value
  const [totalExpenses, setTotalExpenses] = useState(20000);  // Example expense value
  const [currentSavings, setCurrentSavings] = useState(15000);  // Example savings value
  const [savingsGoal, setSavingsGoal] = useState(30000);  // Example savings goal

  useEffect(() => {
    // Fetch the user's data, total income, expenses, and savings here
    // For now, we are using mock data as examples
  }, []);

  const savingsProgress = (currentSavings / savingsGoal) * 100;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Your Profile</h5>
              <img src={user.profilePicture || 'default-profile-pic.jpg'} alt="Profile" width="100" height="100" />
              <p>Email: {user.email}</p>
              <Link to="/profile">
                <Button variant="primary">Update Profile</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h5>Financial Overview</h5>
              <Row>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <h6>Total Income</h6>
                      <p>${totalIncome}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <h6>Total Expenses</h6>
                      <p>${totalExpenses}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <h6>Current Savings</h6>
                      <p>${currentSavings}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <h6>Savings Goal Progress</h6>
                      <ProgressBar now={savingsProgress} label={`${savingsProgress.toFixed(2)}%`} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={4}>
          <Link to="/income-expense">
            <Button variant="success" className="w-100">Add Income</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/income-expense">
            <Button variant="danger" className="w-100">Add Expense</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/goal">
            <Button variant="info" className="w-100">Set Savings Goal</Button>
          </Link>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Link to="/withdraw-reports">
            <Button variant="warning" className="w-100">View Withdrawal Reports</Button>
          </Link>
        </Col>
        <Col md={6}>
          <Link to="/reminders">
            <Button variant="secondary" className="w-100">View Reminders</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
