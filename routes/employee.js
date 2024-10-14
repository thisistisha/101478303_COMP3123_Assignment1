// Importing required modules
const express = require('express');
const router = express.Router(); // Router to handle requests
const Employee = require('../models/employee'); // Employee model

// GET /api/v1/emp/employees - Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Fetch all employees from the database
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/v1/emp/employees - Create a new employee
router.post('/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body); // Create a new employee with the request body
        await employee.save(); // Save the employee to the database
        res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/v1/emp/employees/:eid - Get employee details by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid); // Find employee by ID
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/v1/emp/employees/:eid - Update an employee by ID
router.put('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/v1/emp/employees - Delete an employee by ID
router.delete('/employees', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.query.eid); // Delete employee by query parameter
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(204).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router to be used in app.js
module.exports = router;
