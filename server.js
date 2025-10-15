console.log("Starting server...");
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',          // or your pgAdmin username
  host: 'localhost',
  database: 'Fitness',       // your DB name from pgAdmin
  password: 'Root', // your pgAdmin password
  port: 5432,
});

// Get all members (optional for testing)
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new member (from form)
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, membershipType } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO members (first_name, last_name, email, password, phone_number, membership_type)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [firstName, lastName, email, password, phoneNumber, membershipType]
    );

    res.status(201).json({ message: 'Account created successfully', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
