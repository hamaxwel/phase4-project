import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center text-md-left mb-4 mb-md-0">
          <h1 className="display-4 text-primary font-weight-bold mb-4">Welcome to the Boda-Boda Riders Savings App</h1>
          <p className="lead text-secondary mb-4" style={{ fontSize: '1.2rem' }}>
            Managing your finances just got easier. With our app, you can track your earnings, expenses, and set savings goals, all in one place.
          </p>
          <Link to="/register" className="btn btn-success btn-lg mt-3">Get Started</Link>
        </div>

        <div className="col-12 col-md-6 text-center">
          <img 
            src={`${process.env.PUBLIC_URL}/boda.jpg`} 
            alt="Boda-Boda Riders" 
            className="img-fluid rounded shadow-lg" 
            style={{ maxHeight: '450px', objectFit: 'cover', borderRadius: '15px' }} 
          />
        </div>
      </div>

      <div className="text-center mt-5 pt-5">
        <h3 className="text-secondary mb-4">Why Choose Us?</h3>
        <ul className="list-unstyled mx-auto" style={{ maxWidth: '600px' }}>
          <li className="mb-3"><strong>Easy Income Tracking:</strong> Log your daily earnings quickly.</li>
          <li className="mb-3"><strong>Expense Management:</strong> Keep track of your daily expenses.</li>
          <li className="mb-3"><strong>Set and Track Goals:</strong> Define savings targets and monitor progress.</li>
          <li className="mb-3"><strong>Financial Reports:</strong> Get detailed insights into your finances.</li>
        </ul>
        <Link to="/register" className="btn btn-primary btn-lg mt-3">Get Started</Link>
      </div>
    </div>
  );
};

export default HomePage;
