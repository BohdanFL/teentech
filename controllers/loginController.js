const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Both username and password are required' });
        }

        // Check if the user exists
        const userQuery = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);

        if (userQuery.rows.length == 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userQuery.rows[0];

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Options
        );

        // Send a success response with the token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
