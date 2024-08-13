const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const mysql = require('mysql');
const dotenv = require('dotenv');

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=> {
    if(err) throw err;
    console.log('Connected to MySQL database');
});

// Create a new user
app.post('/users', (req, res) => {
    const { name, email, password, dob } = req.body;
    const sql = 'INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, dob], (err, result) => {
        if (err) throw err;
        res.send('User created successfully');
    });
});

// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, dob } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, password = ?, dob = ? WHERE id = ?';
    db.query(sql, [name, email, password, dob, id], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});