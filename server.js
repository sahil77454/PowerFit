console.log("Starting server...");

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend (IMPORTANT)
app.use(express.static(path.join(__dirname, '.')));

// PostgreSQL Connection (Docker Compatible)
const pool = new Pool({
  user: 'postgres',
  host: 'host.docker.internal',   // IMPORTANT for Docker
  database: 'Fitness',
  password: 'Root',
  port: 5432,
});

// Homepage route (Fix Cannot GET)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get all members
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM members');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new member
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, membershipType } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO members (first_name, last_name, email, password, phone_number, membership_type)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [firstName, lastName, email, password, phoneNumber, membershipType]
    );

    res.status(201).json({
      message: 'Account created successfully',
      user: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Docker compatible listen
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});