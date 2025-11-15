require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const shoppingRoutes = require('./routes/shopping');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/shopping', shoppingRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server running on port', process.env.PORT);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});
    