// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const telegramRouter = require('./routes/telegram');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' })); // accept JSON orders
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/telegram', telegramRouter);

// simple health
app.get('/', (req, res) => res.send('Telegram Order Backend is up.'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});