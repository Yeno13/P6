const express = require('express')
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

module.exports = app;

mongoose.connect('mongodb+srv://Yeno:azerty@cluster0.85gqf.mongodb.net/?retryWrites=true&w=majority',
        {   useNewUrlParser: true,
            useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log(error));



app.use('/api/auth', userRoutes);