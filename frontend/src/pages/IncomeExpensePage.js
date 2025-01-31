import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const IncomeExpensePage = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({ amount: '', date: '', category: '', source: '' });

    const token = localStorage.getItem('access_token');
    
    useEffect(() => {
        fetchIncome();
        fetchExpenses();
    }, []);

    // Fetch all incomes
    const fetchIncome = async () => {
        try {
            const response = await axios.get('https://phase4-project-1twb.onrender.com/income/all', { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            setIncomes(response.data);
        } catch (error) {
            console.error("Error fetching incomes:", error);
        }
    };

    // Fetch all expenses
    const fetchExpenses = async () => {
        try {
            const response = await axios.get('https://phase4-project-1twb.onrender.com/expense/all', { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    // Handle adding income
    const handleAddIncome = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://phase4-project-1twb.onrender.com/income/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchIncome(); // Refresh income list after adding
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    // Handle adding expense
    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://phase4-project-1twb.onrender.com/expense/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchExpenses(); // Refresh expense list after adding
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Income & Expenses</h2>

            {/* Add Income Form */}
            <Form onSubmit={handleAddIncome}>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={formData.amount} 
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={formData.date} 
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Source</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={formData.source} 
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Button type="submit" className="mt-2">Add Income</Button>
            </Form>

            {/* Display Incomes */}
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Source</th>
                    </tr>
                </thead>
                <tbody>
                    {incomes.map((income, index) => (
                        <tr key={index}>
                            <td>{income.amount}</td>
                            <td>{income.date}</td>
                            <td>{income.source}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Expense Form */}
            <Form onSubmit={handleAddExpense} className="mt-4">
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={formData.amount} 
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={formData.category} 
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={formData.date} 
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                        required 
                    />
                </Form.Group>
                <Button type="submit" className="mt-2">Add Expense</Button>
            </Form>

            {/* Display Expenses */}
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.amount}</td>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default IncomeExpensePage;
