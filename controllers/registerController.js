const pool = require('../database/db');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    
    try {
        const { username, email, password } = req.body;


        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
  
        // Use parameterized queries to prevent SQL injection and errors
        const userExists = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );
  
        if (userExists.rows.length > 0) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }
  
        // Hash password (optional)
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Insert the new user
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const user = result.rows[0];

  
        res.status(201).json({ 
            message: 'Registration successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            } 
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};