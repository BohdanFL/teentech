const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','registration.html'));
});

const loginRoutes = require('./routes/auth/login');
const registerRoutes = require('./routes/auth/register');

app.use('/auth/register', registerRoutes);
app.use('/auth/login', loginRoutes);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});